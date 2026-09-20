import { type ZodError, prettifyError, flattenError } from 'zod';
import type { DbError, DetailedError } from '>/lib/shared/types';

export const appErrors = {
  authInvalid: () => ({
    type: 'auth',
    message: 'invalid_credentials',
    details: ['Invalid username or password'],
  }),

  mysql: (error: DbError) => ({
    type: 'db',
    error,
  }),

  schema: (error: ZodError) => ({
    type: 'schema',
    message: prettifyError(error),
    details: flattenError(error).fieldErrors,
    error,
  }),

  server: (error: DetailedError) => ({
    type: 'server',
    message: error.message ?? '',
    details: error.details ?? [],
    error,
  }),
};
