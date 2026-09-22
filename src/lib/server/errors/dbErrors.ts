import { DbError } from '>/lib/shared/types';

export const isDbError = (value: unknown): value is DbError => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'code' in value &&
    typeof value.code === 'string' &&
    'errno' in value &&
    typeof value.errno === 'number'
  );
};
