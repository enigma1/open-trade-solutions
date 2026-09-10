import { getConfigMultiple } from '>/lib/server/db/configuration';
import type { StoreContext } from './types';

export const STORE_CONTEXT_COOKIE = 'store_context';
export const STORE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const getCookie = (request: Request, name: string) => {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, ...rest] = c.split('=');
      return [key, rest.join('=')];
    }),
  );

  return cookies[name] ?? null;
};

// 'store_context';
export const getCookieContext = (
  request: Request,
  context: string = STORE_CONTEXT_COOKIE,
): Record<string, string> | null => {
  const raw = getCookie(request, context);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getDefaultCookieContext = async () => {
  const defaultContext = await getConfigMultiple({
    lang: 'languages.default',
    cu: 'currencies.default',
    locale: 'locale.default',
  });
  return defaultContext as StoreContext;
};
