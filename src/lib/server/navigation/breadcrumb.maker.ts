import type {
  CategoryBreadcrumbType,
  ProductBreadcrumbType,
} from '@/lib/shared/types';
import { routes } from '@/lib/shared/routes';
import { mapCategoriesBreadcrumb } from '@/lib/server/categories/categories.repo';
import type { BreadcrumbItemMapping } from '@/lib/shared/types';

export const buildCategoriesBreadcrumbMapping = (data: {
  categories: CategoryBreadcrumbType[];
}): BreadcrumbItemMapping[] => {
  const { categories } = data;
  const items: BreadcrumbItemMapping[] = [];

  if (categories.length > 0) {
    const categoryPath = mapCategoriesBreadcrumb(categories);
    items.push(...categoryPath);
  }
  return items;
};

export const buildProductBreadcrumbMapping = (data: {
  product: ProductBreadcrumbType;
  categories: CategoryBreadcrumbType[];
}): BreadcrumbItemMapping[] => {
  const { product, categories } = data;

  const items: BreadcrumbItemMapping[] = [];
  items.push(...buildCategoriesBreadcrumbMapping({ categories }));
  items.push({
    label: product.content.products_name,
    href: routes.product(product.content.products_id),
  });

  return items;
};
