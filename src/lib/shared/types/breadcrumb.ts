export type CategoryBreadcrumbType = {
  content: { categories_name: string; categories_id: number };
};

export type ProductBreadcrumbType = {
  content: { products_name: string; products_id: number };
};

export type BreadcrumbItemMapping = {
  label: string;
  href: string;
};
