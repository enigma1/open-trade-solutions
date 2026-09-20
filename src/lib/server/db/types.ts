import { RowDataPacket } from "mysql2";
import { JsonTypes } from ">/lib/shared/types";

export type SqlTypes = Date | bigint | Buffer | JsonTypes | null;
export type SqlObject = { [key in string]?: SqlTypes };
export type SqlRow = SqlTypes[];
export type SqlRows = SqlRow[];

export type SqlColumn = {
  Field: string;
  Type: string;
  Null: "YES" | "NO";
  Key: "PRI" | "UNI" | "MUL" | "";
  Default: string | null;
  Extra: string;
};
export type SqlColumnQuery = RowDataPacket & SqlColumn;

export type WhereCondition = {
  column: string;
  operator: "=" | "!=" | "<" | ">" | "<=" | ">=";
  value: SqlTypes;
};

export type SqlValueMapper = {
  sql: string;
  transform?: (value: unknown) => SqlTypes;
};

export type NestedRow = Record<string, any>;
