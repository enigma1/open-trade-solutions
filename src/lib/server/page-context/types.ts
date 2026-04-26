import { BreadcrumbItemMapping } from '@/lib/shared/types';

export type ProductListingContext = {
  type: 'category' | 'brand' | 'all';
  entity?: {
    id: number;
    name: string;
    description: string;
    image?: string;
  };
  title: string;
  breadcrumb: BreadcrumbItemMapping[];
};

export type Category = {
  id: number;
  name: string;
  description: string;
  image?: string;
};

export type CategoriesListingContext = {
  title: string;
  categories: Category[];
  parentIds: number[];
};

export type TranslatorFn = (
  key: string,
  vars?: Record<string, string>,
) => string;
