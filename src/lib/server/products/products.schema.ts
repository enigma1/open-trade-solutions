import { z } from 'zod';
import { dbAliases } from '>/lib/server/db';
import { limitList, getUniqueNumberedList } from '>/lib/shared/utils';

export const ProductSortSchema = z.enum(['price_asc', 'price_desc', 'newest']);
export type ProductSort = z.infer<typeof ProductSortSchema>;

// returns one property from many found in the object passed in
export const getOneSingleProp = (obj: Record<string, unknown>, key: string) => {
  const keys = Object.keys(obj);
  const matchingKey = keys.find((k) => k === key);
  return matchingKey ? obj[matchingKey] : undefined;
};

const toUniqueNumberList = (val?: string, max = 20) =>
  limitList(getUniqueNumberedList(val), max);

export const ProductsQuerySchema = z.object({
  categories: z
    .string()
    .optional()
    .transform((val) => toUniqueNumberList(val)),
  // brands: z.array(z.coerce.number().int().positive()).default([]),
  brands: z
    .string()
    .optional()
    .transform((val) => toUniqueNumberList(val)),
  sort: ProductSortSchema.optional(),
});

export type ProductsQuery = z.infer<typeof ProductsQuerySchema>;

// Initial Selects
export const initialProductsOnlySelect = {
  [dbAliases.products]: {
    sqlAlias: dbAliases.products,
    domainAlias: 'product',
    columns: ['*'],
  },
  [dbAliases.products_specials]: {
    sqlAlias: dbAliases.products_specials,
    domainAlias: 'special',
    columns: ['*'],
  },
};

export const initialProductsSelect = {
  [dbAliases.products]: {
    sqlAlias: dbAliases.products,
    domainAlias: 'product',
    columns: ['*'],
  },
  [dbAliases.products_specials]: {
    sqlAlias: dbAliases.products_specials,
    domainAlias: 'special',
    columns: ['*'],
  },
  [dbAliases.products_to_categories]: {
    sqlAlias: dbAliases.products_to_categories,
    domainAlias: 'inCategories',
    columns: ['categories_id'],
  },
};

export const initialProductInfoSelect = {
  [dbAliases.products]: {
    sqlAlias: dbAliases.products,
    domainAlias: 'product',
    columns: ['*'],
  },
  [dbAliases.products_specials]: {
    sqlAlias: dbAliases.products_specials,
    domainAlias: 'special',
    columns: ['*'],
  },
  [dbAliases.products_description]: {
    sqlAlias: dbAliases.products_description,
    domainAlias: 'content',
    columns: ['products_name', 'products_description'],
  },
};

export const initialProductInfoFieldsSelect = {
  ...initialProductInfoSelect,
  [dbAliases.products_to_products_extra_fields]: {
    sqlAlias: dbAliases.products_to_products_extra_fields,
    domainAlias: 'extraFields',
    columns: ['*'],
  },
  [dbAliases.products_extra_fields]: {
    sqlAlias: dbAliases.products_extra_fields,
    domainAlias: 'extraFieldsContent',
    columns: ['products_extra_fields_name', 'fields_configuration'],
  },
};

export const initialProductBreadcrumbSelect = {
  [dbAliases.products]: {
    sqlAlias: dbAliases.products,
    domainAlias: 'product',
    columns: ['products_id'],
  },
  [dbAliases.products_description]: {
    sqlAlias: dbAliases.products_description,
    domainAlias: 'content',
    columns: ['products_name', 'products_id'],
  },
};
