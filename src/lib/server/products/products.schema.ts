import { z } from 'zod';
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
  p: {
    sqlAlias: 'p',
    domainAlias: 'product',
    columns: ['*'],
  },
  sp: {
    sqlAlias: 'sp',
    domainAlias: 'special',
    columns: ['*'],
  },
};

export const initialProductsSelect = {
  p: {
    sqlAlias: 'p',
    domainAlias: 'product',
    columns: ['*'],
  },
  sp: {
    sqlAlias: 'sp',
    domainAlias: 'special',
    columns: ['*'],
  },
  p2c: {
    sqlAlias: 'p2c',
    domainAlias: 'inCategories',
    columns: ['categories_id'],
  },
};

export const initialProductInfoSelect = {
  p: {
    sqlAlias: 'p',
    domainAlias: 'product',
    columns: ['*'],
  },
  sp: {
    sqlAlias: 'sp',
    domainAlias: 'special',
    columns: ['*'],
  },
  pd: {
    sqlAlias: 'pd',
    domainAlias: 'content',
    columns: ['products_name', 'products_description'],
  },
};

export const initialProductInfoFieldsSelect = {
  ...initialProductInfoSelect,
  p2pef: {
    sqlAlias: 'p2pef',
    domainAlias: 'extraFields',
    columns: ['*'],
  },
  pef: {
    sqlAlias: 'pef',
    domainAlias: 'extraFieldsContent',
    columns: ['products_extra_fields_name', 'fields_configuration'],
  },
};

export const initialProductBreadcrumbSelect = {
  p: {
    sqlAlias: 'p',
    domainAlias: 'product',
    columns: ['products_id'],
  },
  pd: {
    sqlAlias: 'pd',
    domainAlias: 'content',
    columns: ['products_name', 'products_id'],
  },
};
