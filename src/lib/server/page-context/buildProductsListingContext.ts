import type { ProductListingContext } from './types';
import { getUniqueNumberedList } from '@/lib/shared/utils';
import {
  getCategoriesBreadcrumb,
  getCategoriesDescriptions,
} from '@/lib/server/categories';
import { getBrandBreadcrumb, getBrandsDescriptions } from '@/lib/server/brands';
import type { TranslatorFn } from './types';

export async function buildProductListingContext(
  searchParams: URLSearchParams,
  t: TranslatorFn,
): Promise<ProductListingContext> {
  const categories = getUniqueNumberedList(searchParams.get('categories'));
  const brands = getUniqueNumberedList(searchParams.get('brands'));

  if (categories.length === 1) {
    const breadcrumb = await getCategoriesBreadcrumb(categories[0]);
    const data = await getCategoriesDescriptions([categories[0]]);
    return {
      type: 'category',
      title: t('products.listing.title.category', {
        name: data[0].categories_name,
      }),
      breadcrumb,
      entity: {
        name: data[0].categories_name,
        description: data[0].categories_description,
        id: categories[0],
      },
    };
  }

  if (brands.length === 1) {
    const breadcrumb = await getBrandBreadcrumb(brands[0]);
    const data = await getBrandsDescriptions([brands[0]]);
    // similar logic
    return {
      type: 'brand',
      title: t('products.listing.title.brand', {
        name: data[0].brands_name,
      }),
      breadcrumb: breadcrumb ? [breadcrumb] : [],
      entity: {
        name: data[0].brands_name,
        description: data[0].brands_description,
        id: brands[0],
      },
    };
  }

  return {
    type: 'all',
    title: t('products.listing.title.all'),
    breadcrumb: [],
  };
}
