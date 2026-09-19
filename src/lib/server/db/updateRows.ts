import { type ResultSetHeader, escapeId } from "mysql2";
import type { SqlTypes, SqlRow, WhereCondition } from "./types";
import { db } from "./config";
import { getRealColumns } from "./utils";

type UpdateRowsProps = {
  table: string;
  columnsOrder: string[];
  row: SqlRow;
  where: WhereCondition[];
};

export const updateRows = async ({
  table,
  columnsOrder,
  row,
  where,
}: UpdateRowsProps): Promise<void> => {
  if (where.length === 0) {
    // Generate a domain error message don't expose mysql errors
    return;
  }

  if (row.length !== columnsOrder.length) {
    // Generate a domain error message don't expose mysql errors
    return;
  }

  const escapedTable = escapeId(table);

  const columnTypes = (await getRealColumns({ table })).reduce(
    (acc, col) => {
      acc[col.Field] = col.Type;
      return acc;
    },
    {} as Record<string, string>,
  );

  const values: SqlTypes[] = [];

  const setClauses = columnsOrder.map((col, index) => {
    const val = row[index];
    const type = columnTypes[col];

    if (type.startsWith("json")) {
      values.push(JSON.stringify(val));
      return `${escapeId(col)} = CAST(? AS JSON)`;
    }

    values.push(val);
    return `${escapeId(col)} = ?`;
  });

  const whereValues: SqlTypes[] = [];

  const whereClauses = where.map(({ column, operator, value }) => {
    whereValues.push(value);
    return `${escapeId(column)} ${operator} ?`;
  });

  const sql = `
    UPDATE ${escapedTable}
    SET ${setClauses.join(", ")}
    WHERE ${whereClauses.join(" AND ")}
  `;

  await db.query<ResultSetHeader>({
    sql,
    values: [...values, ...whereValues],
  });
};
