import { parseListOfNumbers } from '@/lib/shared/utils';
import { getProductBreadcrumb } from '@/lib/server/products/product.repo';
import { getCategoriesBreadcrumb } from '@/lib/server/categories/categories.repo';
import { getBrandBreadcrumb } from '@/lib/server/brands/brands.repo';

export const getBreadcrumbFromParams = async (params: URLSearchParams) => {
  const productIds = parseListOfNumbers(params.get('products') ?? '');
  if (productIds.length === 1) {
    return getProductBreadcrumb(productIds[0]);
  }

  const categoryIds = parseListOfNumbers(params.get('categories') ?? '');
  if (categoryIds.length === 1) {
    return getCategoriesBreadcrumb(categoryIds[0]);
  }

  const brandIds = parseListOfNumbers(params.get('brand') ?? '');
  if (brandIds.length === 1) {
    return getBrandBreadcrumb(brandIds[0]);
  }

  return [];
};
