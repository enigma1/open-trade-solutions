import { insertRows } from '>/lib/server/db';
import { buildQuery, createQueryContext } from '>/lib/server/query';
import { queryRows } from '>/lib/server/db';
import { getSession } from '>/lib/server/request';
import { getDefaultUserPrefs } from '>/lib/server/config';
import type { SessionData } from '>/lib/shared/types';
import type { SessionRow } from './types';

export const getSessionId = () => getSession()?.session_id;
export const getSessionData = () => getSession()?.session_data;

export const getSessionById = async (
  sessionKey: string,
): Promise<SessionRow | null> => {
  const ctx = createQueryContext(
    {
      s: {
        sqlAlias: 's',
        domainAlias: 'session',
        columns: ['*'],
      },
    },
    {
      table: 'sessions',
      alias: 's',
    },
  );

  ctx.where.push('s.session_key = ?');
  ctx.params.push(sessionKey);

  const { query, params } = buildQuery({
    ctx,
  });

  const rows = await queryRows<SessionRow>({
    query,
    params,
  });

  return rows[0] ?? null;
};

export const createSessionInDatabase = async (
  sessionKey: string,
): Promise<SessionRow> => {
  const table = 'sessions';
  const initialPrefs = await getDefaultUserPrefs();
  const sessionData: SessionData = {
    prefs: initialPrefs,
    cart: [],
    checkout: 'cart',
  };
  const data = {
    table,
    columnsOrder: ['session_key', 'session_data'],
    rows: [[sessionKey, sessionData]],
  };
  await insertRows(data);
  return {
    session_id: sessionKey,
    session_data: sessionData,
  };
};
