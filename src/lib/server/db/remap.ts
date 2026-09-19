import type { SqlTypes, SqlValueMapper } from "./types";

export const isBinary = (type: string) => {
  return (
    type.startsWith("binary") ||
    type.startsWith("varbinary") ||
    type.endsWith("blob")
  );
};

const isEmptyObjectValue = (value: unknown) => {
  if (value === null || value === undefined) return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (
    typeof value === "object" &&
    !Buffer.isBuffer(value) &&
    Object.keys(value as object).length === 0
  ) {
    return true;
  }

  return false;
};

const bufferTransform = (value: any) => {
  if (Buffer.isBuffer(value)) {
    return value;
  }
  return Buffer.from(value.data);
};

const valueRemappers: Record<string, SqlValueMapper> = {
  json: {
    sql: "CAST(? AS JSON)",
    transform: JSON.stringify,
  },
  date: {
    sql: "?",
    // sql: 'STR_TO_DATE(?)',
  },
  binary: {
    sql: "?",
    transform: bufferTransform,
  },
};

export const getValueMapper = (type: string) => {
  const lType = type.toLowerCase();

  if (isBinary(lType)) {
    return valueRemappers.binary;
  }

  return valueRemappers[lType];
};

export const remapSqlValue = (type: string) => getValueMapper(type)?.sql ?? "?";

export const transformSqlValue = (type: string, value: SqlTypes): SqlTypes => {
  if (value === undefined) {
    return null;
  }

  if (value === null) {
    return null;
  }
  if (isEmptyObjectValue(value)) {
    return null;
  }
  const mapper = getValueMapper(type);
  return mapper?.transform ? mapper.transform(value) : value;
};
