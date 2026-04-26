export type PaginationResult = {
  page: number;
  perPage: number;
  hasMore: boolean;
};

export type GetResultsFromRequest<
  TData extends Record<string, any> = Record<string, any>,
> = {
  data: TData[];
  pagination: PaginationResult;
};
