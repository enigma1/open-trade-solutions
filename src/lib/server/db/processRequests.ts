import { type QueryContext, buildQuery } from ">/lib/server/query";
import { queryRows } from ">/lib/server/db";
import { transformData } from ">/lib/server/shared/transformers";
import { type GetResultsFromRequest } from "./types";

type ProcessNestedTablesRequestProps = {
  ctx: QueryContext;
  pagination: {
    page: number;
    perPage: number;
    limit: number;
    offset: number;
  };
};
export const processNestedTablesRequest = async <
  T extends Record<string, any> = Record<string, any>,
>(
  props: ProcessNestedTablesRequestProps,
): Promise<GetResultsFromRequest<T>> => {
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
  const hasMore = rows.length > pagination.perPage;
  const data = hasMore ? rows.slice(0, pagination.perPage) : rows;
  const transformedData = transformData<T>(data, ctx.select);
  return {
    data: transformedData,
    pagination: {
      page: pagination.page,
      perPage: pagination.perPage,
      hasMore,
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
