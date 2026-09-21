import { dbTables } from '>/lib/server/db';
import { queryRows } from '>/lib/server/db/queryRows';
import { getProductForBreadcrumb } from './product.service';
import type { ProductDescriptionRow } from './types';
import { buildProductBreadcrumbMapping } from '>/lib/server/navigation/breadcrumb.maker';
import { CategoryBreadcrumbType } from '>/lib/shared/types';
import {
  getCategoriesBreadcrumbContent,
  getCategoriesOfProduct,
} from '>/lib/server/categories';

export const getProductsDescriptions = async (
  productIds: number[],
): Promise<ProductDescriptionRow[]> => {
  if (!productIds.length) return [];

  const pdTable = dbTables.products_description;
  const placeholders = productIds.map(() => '?').join(',');
  const query = `SELECT * FROM ${pdTable} WHERE products_id IN (${placeholders}) AND language_id = ?`;

  const rows = await queryRows<ProductDescriptionRow>({
    query,
    params: [...productIds, 1],
  });
  return rows;
};

export const getProductBreadcrumb = async (productId: number) => {
  const product = await getProductForBreadcrumb(productId);
  const categoriesList = await getCategoriesOfProduct(productId);

  const primaryCategoryId = categoriesList[0].content.categories_id;
  let categories: CategoryBreadcrumbType[] = [];

  if (primaryCategoryId) {
    categories = await getCategoriesBreadcrumbContent(primaryCategoryId);
  }

  return buildProductBreadcrumbMapping({
    product,
    categories,
  });
};
