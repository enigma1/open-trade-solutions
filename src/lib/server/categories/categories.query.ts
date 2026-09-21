import { dbAliases, dbTables } from '>/lib/server/db';
import { QueryContext } from '>/lib/server/query';
import {
  addWhereIn,
  addSelect,
  createQueryContext,
} from '>/lib/server/query/buildQueryContext';

export const applyCategoriesToProducts = (
  ctx: QueryContext,
  categories: number[],
) => {
  if (categories.length === 0) return;

  const pAlias = dbAliases.products;
  const p2cAlias = dbAliases.products_to_categories;
  const p2cTable = dbTables.products_to_categories;

  ctx.joins.set(
    p2cAlias,
    `
    JOIN ${p2cTable} ${p2cAlias}
      ON ${pAlias}.products_id = ${p2cAlias}.products_id
    `,
  );
  addWhereIn(ctx, `${p2cAlias}.categories_id`, categories);
};

export const applyCategoriesSort = (ctx: QueryContext, sort?: string) => {
  const cAlias = dbAliases.categories;
  const cdAlias = dbAliases.categories_description;
  switch (sort) {
    case 'name':
    case 'name_asc':
      ctx.orderBy = `${cdAlias}.categories_name ASC`;
      break;
    case 'name_desc':
      ctx.orderBy = `${cdAlias}.categories_name DESC`;
      break;
    case 'order':
    case 'order_asc':
      ctx.orderBy = `${cAlias}.sort_order ASC`;
      break;
    case 'order_desc':
      ctx.orderBy = `${cAlias}.sort_order DESC`;
      break;
  }
};

export const applyCategoriesParents = (
  ctx: QueryContext,
  parents: number | number[] = 0,
) => {
  const cAlias = dbAliases.categories;
  const values = Array.isArray(parents) ? parents : [parents];
  addWhereIn(ctx, `${cAlias}.parent_id`, values);
};

export const applyCategoriesLanguage = (ctx: QueryContext, languageId = 1) => {
  const cAlias = dbAliases.categories;
  const cdAlias = dbAliases.categories_description;
  const cdTable = dbTables.categories_description;

  ctx.joins.set(
    cdAlias,
    `
    LEFT JOIN ${cdTable} ${cdAlias}
      ON ${cAlias}.categories_id = ${cdAlias}.categories_id
      AND ${cdAlias}.language_id = ?
  `,
  );

  addSelect({
    ctx,
    sqlAlias: cdAlias,
    domainAlias: 'categoriesDescription',
    columns: ['categories_name', 'categories_description'],
  });
  ctx.params.push(languageId);
};
