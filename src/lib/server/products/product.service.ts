import { queryRows } from '>/lib/server/db';
import {
  processNestedTablesRequest,
  processNestedTablesSimpleRequest,
  dbTables,
  dbAliases,
} from '>/lib/server/db';
import { type InitialSelectInput, buildQuery } from '>/lib/server/query';
import {
  createProductQueryContext,
  applyProductsSort,
  applyProductsToBrands,
  applyWithSpecialsDated,
  applyWithProducts,
  applyProductsIds,
  applyProductWithSpecials,
  applyFeaturedProductsSort,
  applyProductsLanguage,
  applyHasProductExtraFields,
  applyProductToProductsExtraFields,
} from './product.query';
import { applyCategoriesToProducts } from '>/lib/server/categories/categories.query';
import {
  buildQueryContext,
  createQueryContext,
} from '>/lib/server/query/buildQueryContext';
import { getPage, getLimitOffset } from '>/lib/server/page-listings';
import {
  initialProductBreadcrumbSelect,
  initialProductInfoSelect,
  initialProductsSelect,
  initialProductsOnlySelect,
  ProductsQuerySchema,
  type ProductsQuery,
} from './products.schema';
import { getConfig } from '>/lib/server/config';
import type {
  ProductFullType,
  ProductListBaseType,
  ProductBreadcrumbType,
} from '>/lib/shared/types';
import { isEmptyObject } from '>/lib/shared/utils';
import { languageApi } from '>/lib/server/request/language';

import type { ProductInfoRow } from './types';
import { initialCategoriesBreadcrumbSelect } from '>/lib/server/categories/categories.schema';

export const getProductById = async (
  id: number,
): Promise<ProductInfoRow | null> => {
  const ctx = await createProductQueryContext({
    table: dbTables.products,
    alias: dbAliases.products,
  });
  applyProductsIds(ctx, [id]);
  applyWithSpecialsDated(ctx, 'p');
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
  const { ctx, pagination } = await buildProductQueryContext(
    params,
    initialSelect,
  );
  return processNestedTablesRequest<ProductListBaseType>({
    ctx,
    pagination,
  });
};

export const buildProductQueryContext = async (
  params: URLSearchParams,
  initialSelect: InitialSelectInput,
) => {
  const pAlias = dbAliases.products;
  const pTable = dbTables.products;
  const raw = Object.fromEntries(params.entries());
  const isMixed = 'categories' in raw && 'brands' in raw;
  const page = getPage(raw.page);
  const pagination = await getLimitOffset(page);
  // It builds pagination on the return object fix it.
  const { ctx, query } = await buildQueryContext<ProductsQuery>({
    fromBase: { table: pTable, alias: pAlias },
    params,
    schema: ProductsQuerySchema.pick({
      categories: true,
      brands: !isMixed || undefined, // if both categories and brands are provided, ignore brands filter to avoid empty results
      sort: true,
    }),
    features: [
      (ctx, q) => applyCategoriesToProducts(ctx, q.categories),
      (ctx, q) => applyProductsToBrands(ctx, q.brands),
      (ctx) => applyWithSpecialsDated(ctx, 'p'),
      (ctx, q) => applyProductsSort(ctx, q.sort),
    ],
    initialSelect,
  });
  ctx.where.push(`${pAlias}.products_display = 1`);
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
  const { ctx, pagination } = await buildSpecialProductsQueryContext(
    params,
    initialProductsSelect,
  );
  return processNestedTablesRequest<ProductListBaseType>({
    ctx,
    pagination,
  });
};

export const buildSpecialProductsQueryContext = async (
  params: URLSearchParams,
  initialSelect: InitialSelectInput,
) => {
  const spTable = dbTables.products_specials;
  const spAlias = dbAliases.products_specials;
  const pAlias = dbAliases.products;
  const raw = Object.fromEntries(params.entries());
  const page = getPage(raw.page);
  const pagination = await getLimitOffset(page);
  const { ctx, query } = await buildQueryContext<ProductsQuery>({
    fromBase: { table: spTable, alias: spAlias },
    params,
    schema: ProductsQuerySchema.pick({
      categories: true,
      brands: true,
      sort: true,
    }),
    features: [
      (ctx) => applyWithProducts(ctx, 'sp'),
      (ctx, q) => applyCategoriesToProducts(ctx, q.categories),
      (ctx, q) => applyProductsToBrands(ctx, q.brands),
      (ctx, q) => applyProductsSort(ctx, q.sort),
    ],
    initialSelect,
  });
  ctx.where.push(`${pAlias}.products_display = 1`);
  // after features applied
  ctx.nestTables = ctx.joins.size > 0;
  return {
    ctx,
    query,
    pagination,
  };
};

export const getFeaturedProducts = async () => {
  const count = Number(await getConfig('products.featured_listing_size'));
  if (!count) return [];

  const { ctx } = await buildFeaturedProductsQueryContext(count);
  return await processNestedTablesSimpleRequest<ProductListBaseType>({
    ctx,
  });
};

export const buildFeaturedProductsQueryContext = async (count: number) => {
  const fpTable = dbTables.products_featured;
  const fpAlias = dbAliases.products_featured;
  const pAlias = dbAliases.products;
  const ctx = await createQueryContext(initialProductsOnlySelect, {
    table: fpTable,
    alias: fpAlias,
  });
  applyProductWithSpecials(ctx, 'fp');
  applyHasProductExtraFields(ctx);
  applyFeaturedProductsSort(ctx, 'fp');
  ctx.where.push(`${fpAlias}.status = 1`);
  ctx.where.push(`${pAlias}.products_display = 1`);
  ctx.orderBy = `${fpAlias}.sort_order ASC`;
  ctx.limit = count;
  ctx.nestTables = ctx.joins.size > 0;
  return { ctx };
};

export const getProductInfoById = async (id: number) => {
  const pAlias = dbAliases.products;
  const pTable = dbTables.products;
  const useFields = Boolean(await getConfig('products.use_extra_fields'));
  const ctx = await createQueryContext(initialProductInfoSelect, {
    table: pTable,
    alias: pAlias,
  });

  ctx.ignoredTables = [];
  if (!useFields) {
    ctx.ignoredTables.push(
      ...[
        dbTables.products_extra_fields,
        dbTables.products_to_products_extra_fields,
      ],
    );
  }
  applyWithSpecialsDated(ctx, pAlias);
  applyProductsLanguage(ctx);
  applyProductToProductsExtraFields(ctx, pAlias);

  ctx.where.push(`${pAlias}.products_display = 1`);
  ctx.where.push(`${pAlias}.products_id = ?`);
  ctx.params.push(id);
  ctx.limit = 1;
  ctx.nestTables = ctx.joins.size > 0;
  const rows = await processNestedTablesSimpleRequest<ProductFullType>({
    ctx,
  });
  return rows[0];
};

export const getProductForBreadcrumb = async (id: number) => {
  const pAlias = dbAliases.products;
  const pTable = dbTables.products;
  const ctx = await createQueryContext(initialProductBreadcrumbSelect, {
    table: pTable,
    alias: pAlias,
  });

  applyProductsLanguage(ctx);
  ctx.where.push(`${pAlias}.products_display = 1`);
  ctx.where.push(`${pAlias}.products_id = ?`);
  ctx.params.push(id);
  ctx.limit = 1;
  ctx.nestTables = ctx.joins.size > 0;

  const rows = await processNestedTablesSimpleRequest<ProductBreadcrumbType>({
    ctx,
  });
  return rows[0];
};
