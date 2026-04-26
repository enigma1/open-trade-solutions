import { getConfig, getConfigMultiple } from '@/lib/server/db/configuration';
import { currencyApi } from './currency';
import { languageApi } from './language';

import { AstroCookies } from 'astro';
import {
  getCookieContext,
  getDefaultCookieContext,
  STORE_CONTEXT_COOKIE,
  STORE_COOKIE_MAX_AGE,
} from './cookies';

import type { StoreContext } from './types';
import type { ContextPostParams } from '@/lib/shared/types';

type ResolveStoreContextProps = {
  request: Request;
  params: ContextPostParams;
  cookies: AstroCookies;
};

export const resolveStoreContext = async ({
  request,
  params,
  cookies,
}: ResolveStoreContextProps): Promise<StoreContext> => {
  let cookieCtx = getCookieContext(request) as StoreContext | null;
  let shouldUpdate = false;

  if (!cookieCtx) {
    cookieCtx = await getDefaultCookieContext();
    shouldUpdate = true;
  }

  // resolve language
  const lang = await languageApi.resolveLanguage(cookieCtx?.lang, params?.lang);
  if (lang !== cookieCtx.lang) {
    cookieCtx = { ...cookieCtx, lang };
    shouldUpdate = true;
  }

  // resolve currency
  const cu = await currencyApi.resolveCurrency(cookieCtx?.cu, params?.cu);
  if (cu !== cookieCtx.cu) {
    cookieCtx = { ...cookieCtx, cu };
    shouldUpdate = true;
  }

  if (shouldUpdate) {
    cookies.set(STORE_CONTEXT_COOKIE, JSON.stringify(cookieCtx), {
      path: '/',
      maxAge: STORE_COOKIE_MAX_AGE,
    });
  }

  return cookieCtx;
};
