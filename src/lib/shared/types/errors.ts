export type ErrorTypes = 'auth' | 'schema' | 'server' | 'unknown';
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

export type LocalErrorTypes = 'resource' | 'mock';
export type LocalError = ApiError & {
  error: LocalErrorTypes;
  message: string;
  details?: string[];
};

export type AppError = {
  type: 'auth' | 'db' | 'schema' | 'server';
  message: string;
  details?: string[];
  cause?: unknown;
  status: number;
};
