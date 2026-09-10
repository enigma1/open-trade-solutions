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

  ctx.joins.set(
    'p2c',
    `
    JOIN products_to_categories p2c
      ON p.products_id = p2c.products_id
    `,
  );
  addWhereIn(ctx, 'p2c.categories_id', categories);
};

export const applyCategoriesSort = (ctx: QueryContext, sort?: string) => {
  switch (sort) {
    case 'name_asc':
      ctx.orderBy = 'cd.categories_name ASC';
      break;
    case 'name_desc':
      ctx.orderBy = 'cd.categories_name DESC';
      break;
    case 'order_asc':
      ctx.orderBy = 'c.sort_order ASC';
      break;
  }
};

export const applyCategoriesParents = (
  ctx: QueryContext,
  parents: number | number[] = 0,
) => {
  const values = Array.isArray(parents) ? parents : [parents];
  addWhereIn(ctx, 'c.parent_id', values);
};

export const applyCategoriesLanguage = (ctx: QueryContext, languageId = 1) => {
  const sqlAlias = 'pd';
  ctx.joins.set(
    sqlAlias,
    `
    LEFT JOIN categories_description cd
      ON c.categories_id = cd.categories_id
      AND cd.language_id = ?
  `,
  );

  addSelect({
    ctx,
    sqlAlias,
    domainAlias: 'categoriesDescription',
    columns: ['categories_name', 'categories_description'],
  });
  ctx.params.push(languageId);
};
