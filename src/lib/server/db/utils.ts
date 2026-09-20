import { escapeId } from 'mysql2';
import { db } from './config';
import { SqlColumn, SqlColumnQuery } from './types';

type GetRealColumnsProps = {
  table: string;
};
export const getRealColumns = async ({
  table,
}: GetRealColumnsProps): Promise<SqlColumn[]> => {
  const [cols] = await db.query<SqlColumnQuery[]>(
    `SHOW COLUMNS FROM ${escapeId(table)}`,
  );

  return cols
    .filter((col) => !col.Extra?.toUpperCase().includes('GENERATED'))
    .map((col) => ({
      Field: col.Field,
      Type: col.Type,
      Null: col.Null,
      Key: col.Key,
      Default: col.Default,
      Extra: col.Extra,
    }));
};
