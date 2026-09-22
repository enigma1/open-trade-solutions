import { AppError } from '>/lib/shared/types';

export const serverError = (error: unknown): AppError => {
  const details =
    error &&
    typeof error === 'object' &&
    'details' in error &&
    Array.isArray(error.details)
      ? error.details.filter(
          (detail): detail is string => typeof detail === 'string',
        )
      : [];

  const status =
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'number'
      ? error.code
      : 500;

  const message = error instanceof Error ? error.message : 'server_error';

  return {
    type: 'server',
    status,
    message,
    details,
    cause: error,
  };
};
