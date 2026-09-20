import { queryRows } from ">/lib/server/db";
import {
  processNestedTablesRequest,
  processNestedTablesSimpleRequest,
} from ">/lib/server/db";
import { type InitialSelectInput, buildQuery } from ">/lib/server/query";
import {
  createProductQueryContext,
  applyProductsSort,
  applyProductsToBrands,
  applySpecials,
  applyProducts,
  applyProductsIds,
  applyProductWithSpecials,
  applyFeaturedProductsSort,
  applyProductsLanguage,
  applyExtraFields,
} from "./product.query";
import { applyCategoriesToProducts } from ">/lib/server/categories/categories.query";
import {
  buildQueryContext,
  createQueryContext,
} from ">/lib/server/query/buildQueryContext";
import { transformToLimitOffset } from ">/lib/server/data";
import {
  initialProductBreadcrumbSelect,
  initialProductInfoSelect,
  initialProductsSelect,
  initialProductsOnlySelect,
  ProductsQuerySchema,
  type ProductsQuery,
} from "./products.schema";
import { PaginationSchema } from ">/lib/server/page-listings/pagination";
import { getConfig } from ">/lib/server/config";
import type {
  ProductFullType,
  ProductListBaseType,
  ProductBreadcrumbType,
} from ">/lib/shared/types";
import { isEmptyObject } from ">/lib/shared/utils";

import type { ProductInfoRow } from "./types";
import { initialCategoriesBreadcrumbSelect } from ">/lib/server/categories/categories.schema";

export const getProductById = async (
  id: number,
): Promise<ProductInfoRow | null> => {
  const ctx = createProductQueryContext({ table: "products", alias: "p" });
  applyProductsIds(ctx, [id]);
  applySpecials(ctx, "p");
  const { query, params } = buildQuery({
    ctx,
  });
  const rows = await queryRows<ProductInfoRow>({
    query,
    params: [...params, 1, 0],
  });
  return rows[0] ?? null;
};

// Main Products
export const getProductsFromRequest = async (params: URLSearchParams) => {
  const initialSelect = isEmptyObject(params)
    ? initialProductsOnlySelect
    : initialProductsSelect;
  const { ctx, pagination } = buildProductQueryContext(params, initialSelect);
  return processNestedTablesRequest<ProductListBaseType>({
    ctx,
    pagination,
  });
};

export const buildProductQueryContext = (
  params: URLSearchParams,
  initialSelect: InitialSelectInput,
) => {
  const raw = Object.fromEntries(params.entries());
  const isMixed = "categories" in raw && "brands" in raw;

  const { page, perPage } = PaginationSchema.parse(
    Object.fromEntries(params.entries()),
  );
  const pagination = transformToLimitOffset(page, perPage);
  // It builds pagination on the return object fix it.
  const { ctx, query } = buildQueryContext<ProductsQuery>({
    fromBase: { table: "products", alias: "p" },
    params,
    schema: ProductsQuerySchema.pick({
      categories: true,
      brands: !isMixed || undefined, // if both categories and brands are provided, ignore brands filter to avoid empty results
      sort: true,
    }),
    features: [
      (ctx, q) => applyCategoriesToProducts(ctx, q.categories),
      (ctx, q) => applyProductsToBrands(ctx, q.brands),
      (ctx) => applySpecials(ctx, "p"),
      (ctx, q) => applyProductsSort(ctx, q.sort),
    ],
    initialSelect,
  });
  ctx.where.push("p.products_display = 1");
  // after features applied
  ctx.nestTables = ctx.joins.size > 0;
  return {
    ctx,
    query,
    pagination,
  };
};

// Special Products
export const getSpecialProductsFromRequest = async (
  params: URLSearchParams,
) => {
  const { ctx, pagination } = buildSpecialProductsQueryContext(
    params,
    initialProductsSelect,
  );
  return processNestedTablesRequest<ProductListBaseType>({
    ctx,
    pagination,
  });
};

export const buildSpecialProductsQueryContext = (
  params: URLSearchParams,
  initialSelect: InitialSelectInput,
) => {
  const { page, perPage } = PaginationSchema.parse(
    Object.fromEntries(params.entries()),
  );
  const pagination = transformToLimitOffset(page, perPage);
  const { ctx, query } = buildQueryContext<ProductsQuery>({
    fromBase: { table: "products_specials", alias: "sp" },
    params,
    schema: ProductsQuerySchema.pick({
      categories: true,
      brands: true,
      sort: true,
    }),
    features: [
      (ctx) => applyProducts(ctx, "sp"),
      (ctx, q) => applyCategoriesToProducts(ctx, q.categories),
      (ctx, q) => applyProductsToBrands(ctx, q.brands),
      (ctx, q) => applyProductsSort(ctx, q.sort),
    ],
    initialSelect,
  });
  ctx.where.push("p.products_display = 1");
  // after features applied
  ctx.nestTables = ctx.joins.size > 0;
  return {
    ctx,
    query,
    pagination,
  };
};

export const getFeaturedProducts = async () => {
  const count = Number(await getConfig("products.featured_listing_size"));
  if (!count) return [];

  const { ctx } = buildFeaturedProductsQueryContext(count);
  return await processNestedTablesSimpleRequest<ProductListBaseType>({
    ctx,
  });
};

export const buildFeaturedProductsQueryContext = (count: number) => {
  const ctx = createQueryContext(initialProductsOnlySelect, {
    table: "products_featured",
    alias: "fp",
  });
  applyProductWithSpecials(ctx, "fp");
  applyExtraFields(ctx);
  applyFeaturedProductsSort(ctx, "fp");
  ctx.where.push("fp.status = 1");
  ctx.where.push("p.products_display = 1");
  ctx.orderBy = "fp.sort_order ASC";
  ctx.limit = count;
  ctx.nestTables = ctx.joins.size > 0;
  return { ctx };
};

export const getProductInfoById = async (id: number) => {
  const ctx = createQueryContext(initialProductInfoSelect, {
    table: "products",
    alias: "p",
  });
  applySpecials(ctx, "p");
  applyProductsLanguage(ctx);
  ctx.where.push("p.products_display = 1");
  ctx.where.push("p.products_id = ?");
  ctx.params.push(id);
  ctx.limit = 1;
  ctx.nestTables = ctx.joins.size > 0;
  const rows = await processNestedTablesSimpleRequest<ProductFullType>({
    ctx,
  });
  return rows[0];
};

export const getProductForBreadcrumb = async (id: number) => {
  const ctx = createQueryContext(initialProductBreadcrumbSelect, {
    table: "products",
    alias: "p",
  });

  applyProductsLanguage(ctx, 1);
  ctx.where.push("p.products_display = 1");
  ctx.where.push("p.products_id = ?");
  ctx.params.push(id);
  ctx.limit = 1;
  ctx.nestTables = ctx.joins.size > 0;

  const rows = await processNestedTablesSimpleRequest<ProductBreadcrumbType>({
    ctx,
  });
  return rows[0];
};
