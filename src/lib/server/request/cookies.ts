import { AstroCookies } from "astro";
import {
  PROBE_COOKIE_ID,
  PROBE_COOKIE_LIFETIME,
  SHOP_COOKIE_ID,
  SHOP_COOKIE_LIFETIME,
  REDIRECT_MARKER,
  getEnvKey,
} from ">/lib/server/config";
import {
  randomBytes,
  randomUUID,
  createHmac,
  timingSafeEqual,
} from "node:crypto";

// Used for the probe cookie to detect whether the browser is storing cookies.
// The probe cookie is signed by this PROBE_SECRET so it cannot be fabricated by the client.
// Use a random string for the PROBE_SECRET in production inside the .env, and keep it secret.
const PROBE_SECRET = getEnvKey("PROBE_SECRET") ?? "-";

export const createProbeCookieSignature = (): string => {
  const nonce = randomBytes(32).toString("base64url");

  const signature = createHmac("sha256", PROBE_SECRET)
    .update(nonce)
    .digest("base64url");

  return `${nonce}.${signature}`;
};

export const createShopCookieSignature = (): string => {
  const newSessionId = randomUUID();
  return newSessionId;
};

// Validate the probe cookie received
export const verifyProbeCookieSignature = (value: string): boolean => {
  const [nonce, signature] = value.split(".");

  if (!nonce || !signature) {
    return false;
  }

  const expected = createHmac("sha256", PROBE_SECRET).update(nonce).digest();
  const actual = Buffer.from(signature, "base64url");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

// Create a redirection URL with a marker to detect if visitor can accept cookies.
export const createRedirection = (url: URL): string => {
  const next = new URL(url);
  next.searchParams.set(REDIRECT_MARKER, "1");
  return `${next.pathname}${next.search}`;
};

// Seth the probe cookie
export const setProbeCookie = (cookies: AstroCookies) => {
  cookies.set(PROBE_COOKIE_ID, createProbeCookieSignature(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: PROBE_COOKIE_LIFETIME,
  });
};

// Set the session cookie for the shop
export const setShopCookie = (cookies: AstroCookies, sessionId: string) => {
  cookies.set(SHOP_COOKIE_ID, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SHOP_COOKIE_LIFETIME,
  });
};

export const deleteCookie = (cookies: AstroCookies, cookieId: string) => {
  cookies.delete(cookieId, {
    path: "/",
  });
};
