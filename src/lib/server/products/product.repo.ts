import { queryRows } from '>/lib/server/db/queryRows';
import { getProductForBreadcrumb } from './product.service';
import type { ProductDescriptionRow } from './types';
import { buildProductBreadcrumbMapping } from '>/lib/server/navigation/breadcrumb.maker';
import { CategoryBreadcrumbType } from '>/lib/shared/types';
import {
  getCategoriesBreadcrumbContent,
  getCategoriesOfProduct,
} from '>/lib/server/categories';

// export const getSpecials = async (
//   productIds: number[],
// ): Promise<ProductSpecialRow[]> => {
//   if (productIds.length === 0) return [];
//   const placeholders = productIds.map(() => '?').join(',');
//   const rows = await queryRows<ProductSpecialRow>(
//     `SELECT * FROM products_specials
//      WHERE products_id IN (${placeholders})
//      AND NOW() BETWEEN start_date AND end_date`,
//     productIds,
//   );
//   return rows;
// };

// export const getProductById = async (id: number) => {
//   const query =
//     'SELECT * FROM products p left join products_description pd on (p.products_id = pd.products_id) AND pd.language_id = ? WHERE p.products_id = ?';
//   const rows = await queryRows<ProductDescriptionRow>({
//     query,
//     params: [1, id],
//   });

//   return rows[0];
// };

export const getProductsDescriptions = async (
  productIds: number[],
): Promise<ProductDescriptionRow[]> => {
  if (!productIds.length) return [];

  const placeholders = productIds.map(() => '?').join(',');

  const query = `SELECT * FROM products_description WHERE products_id IN (${placeholders}) AND language_id = ?`;

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
