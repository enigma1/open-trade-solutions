import { z, ZodError, prettifyError, flattenError } from 'zod';
import type { APIContext } from 'astro';
import { AppErrorSchema } from '>/lib/shared/contracts';
import type { DbError, AppError } from '>/lib/shared/types';
import { serverError } from './serverErrors';
import { isDbError } from './dbErrors';

export const appErrors = {
  authInvalid: (): AppError => ({
    type: 'auth',
    status: 401,
    message: 'invalid_credentials',
    details: ['Invalid username or password'],
  }),

  mysql: (error: DbError): AppError => ({
    type: 'db',
    status: 500,
    message: 'database_error',
    cause: error,
  }),

  schema: (error: ZodError): AppError => ({
    type: 'schema',
    status: 400,
    message: 'validation_error',
    details: Object.values(flattenError(error).fieldErrors).flat() as string[],
    cause: error,
  }),
  server: serverError,
};

export const isAppError = (value: unknown): value is AppError => {
  return AppErrorSchema.safeParse(value).success;
};

export const errorResolver = (e: unknown): AppError => {
  if (isAppError(e)) {
    return e;
  }

  if (e instanceof ZodError) {
    return appErrors.schema(e);
  }

  if (isDbError(e)) {
    return appErrors.mysql(e);
  }

  // if (isHttpError(e)) {
  //   return appErrors.http(e);
  // }

  return appErrors.server(e);
};

export const handleRequestError = (
  error: unknown,
  context: APIContext,
): Response => {
  console.error(error);
  const appError = errorResolver(error);

  return Response.json(
    {
      ok: false,
      error: {
        type: appError.type,
        message: appError.message,
        details: appError.details,
      },
    },
    {
      status: appError.status,
    },
  );
};
