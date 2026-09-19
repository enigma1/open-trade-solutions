import { type ResultSetHeader, escapeId } from "mysql2";
import { appErrors } from ">/lib/server/errors";
import { db } from "./config";
import { getRealColumns } from "./utils";
import { remapSqlValue, transformSqlValue } from "./remap";
import type { SqlTypes, SqlRows } from "./types";

type InsertRowsProps = {
  table: string;
  columnsOrder: string[];
  rows: SqlRows;
};

export const insertRows = async ({
  table,
  columnsOrder,
  rows,
}: InsertRowsProps): Promise<void> => {
  if (rows.length === 0) {
    return;
  }

  if (rows.some((row) => row.length !== columnsOrder.length)) {
    // Generate a domain error
    return;
  }

  const escapedTable = escapeId(table);

  const realColumns = await getRealColumns({ table });

  const columnsByName = new Map(
    realColumns.map((column) => [column.Field, column]),
  );

  const columns = columnsOrder.map((columnName) => {
    const column = columnsByName.get(columnName);

    if (!column) {
      // Generate a domain error
      throw appErrors.server({
        message: "invalid_table_column",
        details: [
          `Cannot insert into table with unknown column: ${columnName}`,
        ],
      });

      throw new Error(`Unknown column: ${columnName}`);
    }

    return column;
  });

  const escapedColumns = columns
    .map((column) => escapeId(column.Field))
    .join(", ");

  const params: SqlTypes[] = [];

  const valuesSql = rows
    .map((row) => {
      const placeholders = row.map((value, index) => {
        const column = columns[index];
        params.push(transformSqlValue(column.Type, value));
        return remapSqlValue(column.Type);
      });
      return `(${placeholders.join(", ")})`;
    })
    .join(", ");

  const sql = `INSERT INTO ${escapedTable} (${escapedColumns}) VALUES ${valuesSql}`;

  await db.query<ResultSetHeader>({
    sql,
    values: params,
  });
};
