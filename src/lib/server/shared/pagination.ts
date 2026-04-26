import { z } from 'zod';
export const PAGINATION = {
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 200,
} as const;

export type PaginationParams = {
  limit?: number;
  offset?: number;
};

export const getLimitAndOffset = (params?: PaginationParams) => {
  let limit =
    Number.isFinite(params?.limit) && params!.limit! > 0
      ? params!.limit!
      : PAGINATION.DEFAULT_LIMIT;

  limit = Math.min(limit, PAGINATION.MAX_LIMIT);

  const offset =
    Number.isFinite(params?.offset) && params!.offset! >= 0
      ? params!.offset!
      : 0;

  return { limit, offset };
};

export const transformToLimitOffset = (page: number, perPage: number) => {
  const safePage = page > 0 ? page : 1;

  const safePerPage = Math.min(
    perPage > 0 ? perPage : PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT,
  );

  return {
    limit: safePerPage + 1,
    offset: (safePage - 1) * safePerPage,
    page: safePage,
    perPage: safePerPage,
  };
};

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
});
