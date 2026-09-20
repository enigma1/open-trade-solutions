import { type QueryContext, buildQuery } from ">/lib/server/query";
import { queryRows } from ">/lib/server/db";
import { transformData } from ">/lib/server/data/transformers";
import { PaginatedResult } from ">/lib/server/page-listings/";

type ProcessNestedTablesRequestProps = {
  ctx: QueryContext;
  pagination: {
    limit: number;
    offset: number;
  };
};
export const processNestedTablesRequest = async <
  T extends Record<string, any> = Record<string, any>,
>(
  props: ProcessNestedTablesRequestProps,
): Promise<PaginatedResult<T>> => {
  const { ctx, pagination } = props;
  const { query, params: queryParams } = buildQuery({
    ctx,
    pagination,
  });
  const rows = await queryRows({
    query,
    params: queryParams,
    options: { nestTables: ctx.nestTables },
  });
  const hasNext = rows.length > pagination.limit;
  const data = hasNext ? rows.slice(0, pagination.limit) : rows;
  const transformedData = transformData<T>(data, ctx.select);
  return {
    items: transformedData,
    pagination: {
      offset: pagination.offset,
      limit: pagination.limit,
      hasNext: hasNext,
      hasPrevious: pagination.offset > 0,
    },
  };
};

export const processNestedTablesSimpleRequest = async <
  T extends Record<string, any> = Record<string, any>,
>({
  ctx,
}: {
  ctx: QueryContext;
}) => {
  const { query, params } = buildQuery({ ctx });

  const rows = await queryRows({
    query,
    params,
    options: { nestTables: ctx.nestTables },
  });

  return transformData<T>(rows, ctx.select);
};
