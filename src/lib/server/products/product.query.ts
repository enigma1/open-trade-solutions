import { dbTables, dbAliases } from '>/lib/server/db';
import { initialProductsSelect } from './products.schema';
import type { BaseTable, QueryContext } from '>/lib/server/query/types';
import {
  addWhereIn,
  addSelect,
  createQueryContext,
} from '>/lib/server/query/buildQueryContext';
import { getConfig } from '>/lib/server/config';
import { languageApi } from '>/lib/server/request/language';

export const shouldIgnoreTable = (ctx: QueryContext, table: string) =>
  ctx.ignoredTables?.includes(table) ?? false;

export const createProductQueryContext = async (
  fromBase: BaseTable,
): Promise<QueryContext> => {
  const useFields = Boolean(await getConfig('products.use_extra_fields'));
  const ctx = await createQueryContext(initialProductsSelect, fromBase);
  ctx.ignoredTables = [];
  const pAlias = dbAliases.products;

  if (!useFields) {
    ctx.ignoredTables.push(
      ...[
        dbTables.products_extra_fields,
        dbTables.products_to_products_extra_fields,
      ],
    );
  }
  ctx.where.push(`${pAlias}.products_display = 1`);
  return ctx;
};

export const applyProductsToCategories = (
  ctx: QueryContext,
  products: number[],
) => {
  if (!products.length) return;

  const p2cTable = dbTables.products_to_categories;
  const p2cAlias = dbAliases.products_to_categories;
  const pAlias = dbAliases.products;
  ctx.joins.set(
    p2cAlias,
    `
    JOIN ${p2cTable} ${p2cAlias}
      ON ${pAlias}.products_id = ${p2cAlias}.products_id
    `,
  );

  addWhereIn(ctx, `${p2cAlias}.products_id`, products);
};

export const applyProductsToBrands = (ctx: QueryContext, brands: number[]) => {
  if (!brands.length) return;
  const p2bTable = dbTables.products_to_brands;
  const p2bAlias = dbAliases.products_to_brands;
  const pAlias = dbAliases.products;
  ctx.joins.set(
    p2bAlias,
    `
    JOIN ${p2bTable} ${p2bAlias}
      ON ${pAlias}.products_id = ${p2bAlias}.products_id
    `,
  );

  addWhereIn(ctx, `${p2bAlias}.brands_id`, brands);
};

export const applyProductsIds = (ctx: QueryContext, ids: number[]) => {
  const pAlias = dbAliases.products;
  addWhereIn(ctx, `${pAlias}.products_id`, ids);
};

export const applyWithProducts = (ctx: QueryContext, inAlias: string) => {
  const pAlias = dbAliases.products;
  ctx.joins.set(
    pAlias,
    `
    LEFT JOIN ${dbTables.products} ${pAlias}
      ON ${pAlias}.products_id = ${inAlias}.products_id
    `,
  );
};

export const applyWithSpecialsDated = (ctx: QueryContext, inAlias: string) => {
  const spTable = dbTables.products_specials;
  const spAlias = dbAliases.products_specials;
  ctx.joins.set(
    spAlias,
    `
    LEFT JOIN ${spTable} ${spAlias}
      ON ${spAlias}.products_id = ${inAlias}.products_id
      AND NOW() BETWEEN ${spAlias}.start_date AND ${spAlias}.end_date
    `,
  );
};

export const applyProductToProductsExtraFields = (
  ctx: QueryContext,
  alias: string,
) => {
  const p2pefTable = dbTables.products_to_products_extra_fields;
  if (shouldIgnoreTable(ctx, p2pefTable)) return;

  const p2pefAlias = dbAliases.products_to_products_extra_fields;
  ctx.joins.set(
    p2pefAlias,
    `LEFT JOIN ${p2pefTable} ${p2pefAlias} ON ${p2pefAlias}.products_id = ${alias}.products_id`,
  );
};

export const applyProductsExtraFields = (ctx: QueryContext) => {
  const pefTable = dbTables.products_extra_fields;
  if (shouldIgnoreTable(ctx, pefTable)) return;

  const pefAlias = dbAliases.products_extra_fields;
  const p2pefAlias = dbAliases.products_to_products_extra_fields;
  ctx.joins.set(
    pefAlias,
    `
    LEFT JOIN ${pefTable} ${pefAlias}
      ON ${pefAlias}.products_extra_fields_id = ${p2pefAlias}.products_extra_fields_id
    `,
  );
};

export const applyProductWithSpecials = (
  ctx: QueryContext,
  inAlias: string,
) => {
  applyWithProducts(ctx, inAlias);
  applyWithSpecialsDated(ctx, inAlias);
};

export const applyProductsLanguage = async (ctx: QueryContext) => {
  const pdTable = dbTables.products_description;
  const pdAlias = dbAliases.products_description;
  const pAlias = dbAliases.products;
  ctx.joins.set(
    pdAlias,
    `
    LEFT JOIN ${pdTable} ${pdAlias}
      ON ${pAlias}.products_id = ${pdAlias}.products_id
      AND ${pdAlias}.language_id = ?
  `,
  );

  addSelect({
    ctx,
    sqlAlias: pdAlias,
    domainAlias: 'productsDescription',
    columns: ['products_name', 'products_description'],
  });
  ctx.params.push(ctx.languageId);
};

export const applyProductsSort = (ctx: QueryContext, sort?: string) => {
  const pAlias = dbAliases.products;
  const spAlias = dbAliases.products_specials;

  switch (sort) {
    case 'price':
    case 'price_asc':
      ctx.orderBy = `${pAlias}.products_price ASC`;
      break;
    case 'price_desc':
      ctx.orderBy = `${pAlias}.products_price DESC`;
      break;

    case 'special_price':
    case 'special_price_asc':
      applyWithSpecialsDated(ctx, pAlias); // ensures join exists
      ctx.orderBy = `${spAlias}.special_price ASC`;
      break;
    case 'special_price_desc':
      applyWithSpecialsDated(ctx, pAlias); // ensures join exists
      ctx.orderBy = `${spAlias}.special_price DESC`;
      break;
  }
};

export const applyFeaturedProductsSort = (ctx: QueryContext, sort?: string) => {
  const fpAlias = dbAliases.products_featured;
  switch (sort) {
    case 'sort_order':
    case 'sort_order_asc':
      ctx.orderBy = `${fpAlias}.sort_order ASC`;
      break;
    case 'sort_order_desc':
      ctx.orderBy = `${fpAlias}.sort_order DESC`;
      break;
  }
};

export const applyHasProductExtraFields = async (ctx: QueryContext) => {
  const p2pefTable = dbTables.products_to_products_extra_fields;
  if (shouldIgnoreTable(ctx, p2pefTable)) return;

  const p2pefAlias = dbAliases.products_to_products_extra_fields;
  const pAlias = dbAliases.products;

  addSelect({
    ctx,
    sqlAlias: pAlias,
    domainAlias: 'product',
    columns: [
      `EXISTS (
        SELECT 1 FROM ${p2pefTable} ${p2pefAlias}
        WHERE ${p2pefAlias}.products_id = ${pAlias}.products_id
      ) AS has_extra_fields`,
    ],
  });
};
