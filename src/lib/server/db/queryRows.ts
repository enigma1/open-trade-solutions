import { db } from "./config";
import type { NestedRow } from "./types";

type QueryRowProps = {
  query: string;
  params: any[];
  options?: { nestTables?: boolean };
};

export const queryRows = async <T = NestedRow>({
  query,
  params,
  options,
}: QueryRowProps): Promise<T[]> => {
  // console.log('Executing query:', { query, params, options });
  const [rows] = await db.query({
    sql: query,
    values: params,
    nestTables: options?.nestTables ?? false,
  });
  return rows as T[];
};
