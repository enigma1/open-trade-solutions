export type PaginationRequest = {
  offset: number;
  limit: number;
};

export type PaginationResponse = {
  offset: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type PaginatedResult<T> = {
  items: T[];
  pagination: PaginationResponse;
};
