export type DetailedError = {
  code?: number;
  message?: string;
  details?: string[];
};

export type DbError = {
  errno: number;
  code: string;
  sqlState: string;
  sqlMessage: string;
  sql: string;
};

export type ApiError = Error & {
  error: string;
  message: string;
  details?: string[];
};

export type LocalErrorTypes = "resource" | "mock";
export type LocalError = ApiError & {
  error: LocalErrorTypes;
  message: string;
  details?: string[];
};
