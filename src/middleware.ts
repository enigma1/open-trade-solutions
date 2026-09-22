import {
  PROBE_COOKIE_ID,
  SHOP_COOKIE_ID,
  REDIRECT_MARKER,
} from '>/lib/server/config';
import { defineMiddleware } from 'astro:middleware';
import { randomUUID } from 'node:crypto';
import {
  createRedirection,
  verifyProbeCookieSignature,
  deleteCookie,
  setProbeCookie,
  setShopCookie,
  RequestStore,
} from '>/lib/server/request';
import { handleRequestError } from '>/lib/server/errors';
import { getSessionById, createSessionInDatabase } from '>/lib/server/sessions';
import { als } from '>/lib/server/request';

export const onRequest = defineMiddleware(async (context, next) => {
  const continueRequest = async (store: RequestStore) => {
    try {
      return await als.run(store, () => next());
    } catch (error) {
      return handleRequestError(error, context);
    }
  };

  const { cookies, url } = context;
  const userAgent = context.request.headers.get('user-agent') ?? '';
  const isCrawler =
    !userAgent ||
    /bot|crawler|spider|slurp|archiver|fetcher|preview/i.test(userAgent);

  const otsId = cookies.get(SHOP_COOKIE_ID)?.value;
  const probe = cookies.get(PROBE_COOKIE_ID)?.value;
  const redirected = url.searchParams.get(REDIRECT_MARKER);

  // Set the local redirection flag if already being redirected
  context.locals.redirected = redirected === '1';

  // If a session cookie received validate it against the database.
  if (otsId) {
    const session = await getSessionById(otsId);

    if (session) {
      // Make session available throughout the application
      context.locals.session = session;
      return continueRequest({ session });
    }

    // No match found, remove it from the browser
    deleteCookie(cookies, SHOP_COOKIE_ID);
  }

  // Avoid infinite redirects if already redirected previously just set the probe cookies and leave.
  if (redirected === '1' && !probe) {
    context.locals.cookiesDisabled = true;
    setProbeCookie(cookies);
    return continueRequest({});
  }

  // No probe cookie present, send it and check if it's a crawler.
  if (!probe) {
    setProbeCookie(cookies);

    // If not a knowwn crawler treat as a visitor who blocks cookies
    if (!isCrawler) {
      return context.redirect(createRedirection(url), 303);
    }

    // Do not redirect crawlers serve empty session content
    return continueRequest({});
  }

  // Probe cookies received, if invalid send a new one and issue a redirect
  if (!verifyProbeCookieSignature(probe)) {
    setProbeCookie(cookies);
    return context.redirect(createRedirection(url), 303);
  }

  // Visitor accepts cookies, create a true session cookie and remove the probe cookie
  const newSessionId = randomUUID();
  const session = await createSessionInDatabase(newSessionId);
  setShopCookie(cookies, newSessionId);
  deleteCookie(cookies, PROBE_COOKIE_ID);
  return continueRequest({ session });
});
