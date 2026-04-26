export type BreadcrumbContext =
  | { source: 'product' }
  | { source: 'category'; categoryId: number }
  | { source: 'brand'; brandId: number }
  | { source: 'search' };
