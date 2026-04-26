import { z } from 'zod';

export const CategoriesSortSchema = z.enum([
  'name_asc',
  'name_desc',
  'date_added',
  'sort',
]);
export type CategoriesSort = z.infer<typeof CategoriesSortSchema>;
export const CategoriesQuerySchema = z.object({
  parent: z.coerce.number().int().min(0).default(0),
  categories: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map(Number) : [])),
  sort: CategoriesSortSchema.optional(),
});

export type CategoriesQuery = z.infer<typeof CategoriesQuerySchema>;

export const initialCategoriesSelect = {
  c: {
    sqlAlias: 'c',
    domainAlias: 'category',
    columns: ['*'],
  },
  pd: {
    sqlAlias: 'cd',
    domainAlias: 'content',
    columns: ['categories_name', 'categories_description'],
  },
};

export const initialCategoriesBreadcrumbSelect = {
  c: {
    sqlAlias: 'c',
    domainAlias: 'category',
    columns: ['categories_id'],
  },
  cd: {
    sqlAlias: 'cd',
    domainAlias: 'content',
    columns: ['categories_id', 'categories_name'],
  },
  p2c: {
    sqlAlias: 'p2c',
    domainAlias: 'inCategories',
    columns: ['categories_id'],
  },
};
