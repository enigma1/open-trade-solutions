import { AsyncLocalStorage } from 'node:async_hooks';
import type { SessionRow } from '>/lib/server/sessions';

export type RequestStore = {
  session?: SessionRow;
  sessionId?: string;
};

const als = new AsyncLocalStorage<RequestStore>();

export const getRequestContext = (): RequestStore => {
  return als.getStore() ?? {};
};

export const getSession = (): SessionRow | undefined => {
  return getRequestContext().session;
};

export { als };
