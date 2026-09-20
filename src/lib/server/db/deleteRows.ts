import { type ResultSetHeader, escapeId } from 'mysql2';
import type { SqlTypes, WhereCondition } from './types';
import { db } from './config';

type DeleteRowsProps = {
  table: string;
  where: WhereCondition[];
};

export const deleteRows = async ({
  table,
  where,
}: DeleteRowsProps): Promise<void> => {
  if (where.length === 0) {
    // Generate a domain error message; don't expose MySQL errors
    return;
  }

  const escapedTable = escapeId(table);

  const whereValues: SqlTypes[] = [];

  const whereClauses = where.map(({ column, operator, value }) => {
    whereValues.push(value);
    return `${escapeId(column)} ${operator} ?`;
  });

  const sql = `
    DELETE FROM ${escapedTable}
    WHERE ${whereClauses.join(' AND ')}
  `;

  await db.query<ResultSetHeader>({
    sql,
    values: whereValues,
  });
};
