import { buildQueryContext, InitialSelectInput } from ">/lib/server/query";
import { PaginationSchema, transformToLimitOffset } from ">/lib/server/shared";
import {
  CategoriesQuerySchema,
  CategoriesQuery,
  initialCategoriesSelect,
} from "./categories.schema";
import {
  applyCategoriesSort,
  applyCategoriesParents,
  applyCategoriesToProducts,
  applyCategoriesLanguage,
} from "./categories.query";
import {
  processNestedTablesSimpleRequest,
  processNestedTablesRequest,
} from ">/lib/server/db";
import { createQueryContext } from ">/lib/server/query";
import {
  CategoryBreadcrumbType,
  CategoryListBaseType,
} from ">/lib/shared/types";
import { initialCategoriesBreadcrumbSelect } from "./categories.schema";

export const getCategoriesOfProduct = async (id: number) => {
  const ctx = createQueryContext(initialCategoriesBreadcrumbSelect, {
    table: "categories",
    alias: "c",
  });

  applyCategoriesToProducts(ctx, [id]);
  applyCategoriesSort(ctx, "order_asc");
  // ctx.where.push('c.categories_display = 1'); // Add a new column later for this
  ctx.where.push("p2c.products_id = ?");
  ctx.params.push(id);
  ctx.nestTables = ctx.joins.size > 0;

  const rows = await processNestedTablesSimpleRequest<CategoryBreadcrumbType>({
    ctx,
  });
  return rows;
};

export const getCategoriesFromRequest = async (params: URLSearchParams) => {
  const initialSelect = initialCategoriesSelect;
  const { ctx, pagination } = buildCategoriesQueryContext(
    params,
    initialSelect,
  );
  return processNestedTablesRequest<CategoryListBaseType>({
    ctx,
    pagination,
  });
};

export const buildCategoriesQueryContext = (
  params: URLSearchParams,
  initialSelect: InitialSelectInput,
) => {
  const raw = Object.fromEntries(params.entries());
  const { page, perPage } = PaginationSchema.parse(
    Object.fromEntries(params.entries()),
  );
  const pagination = transformToLimitOffset(page, perPage);
  // It builds pagination on the return object fix it.
  const { ctx, query } = buildQueryContext<CategoriesQuery>({
    fromBase: { table: "categories", alias: "c" },
    params,
    schema: CategoriesQuerySchema.pick({
      categories: true,
      sort: true,
    }),
    features: [
      (ctx) => applyCategoriesLanguage(ctx),
      (ctx, q) =>
        applyCategoriesParents(ctx, q.categories.length > 0 ? q.categories : 0),
      (ctx, q) => applyCategoriesSort(ctx, q.sort),
    ],
    initialSelect,
  });
  // ctx.where.push('c.categories_display = 1');
  // after features applied
  ctx.nestTables = ctx.joins.size > 0;
  return {
    ctx,
    query,
    pagination,
  };
};
