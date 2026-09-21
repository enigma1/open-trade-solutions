import { insertRows, updateRows } from '>/lib/server/db';
import { buildQuery, createQueryContext } from '>/lib/server/query';
import { dbTables, dbAliases, queryRows } from '>/lib/server/db';
import { getSession } from '>/lib/server/request';
import { getDefaultUserPrefs } from '>/lib/server/config';
import type { SessionData } from '>/lib/shared/types';
import type { SessionRow } from './types';

export const getSessionId = () => getSession()?.session_id;
export const getSessionData = () => getSession()?.session_data;

export const getSessionById = async (
  sessionKey: string,
): Promise<SessionRow | null> => {
  const sAlias = dbAliases.sessions;
  const sTable = dbTables.sessions;

  const ctx = await createQueryContext(
    {
      s: {
        sqlAlias: sAlias,
        domainAlias: 'session',
        columns: ['*'],
      },
    },
    {
      table: sTable,
      alias: sAlias,
    },
  );

  ctx.where.push(`${sAlias}.session_key = ?`);
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
  const sTable = dbTables.sessions;
  const initialPrefs = await getDefaultUserPrefs();
  const sessionData: SessionData = {
    prefs: initialPrefs,
    cart: [],
    checkout: 'cart',
  };
  const data = {
    table: sTable,
    columnsOrder: ['session_key', 'session_data'],
    rows: [[sessionKey, sessionData]],
  };
  await insertRows(data);
  return {
    session_id: sessionKey,
    session_data: sessionData,
  };
};

export const updateSessionInDatabase = async (
  sessionKey: string,
  sessionData: SessionData,
): Promise<void> => {
  const sTable = dbTables.sessions;
  await updateRows({
    table: sTable,
    columnsOrder: ['session_data'],
    row: [sessionData],
    where: [
      {
        column: 'session_key',
        operator: '=',
        value: sessionKey,
      },
    ],
  });
};
