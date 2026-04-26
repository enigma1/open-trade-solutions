export type CategoryListType = {
  id: number;
  name: string;
  image?: string;
  align?: 'top' | 'bottom';
};

export type CategoryInfoType = {
  id: number;
  name: string;
  description: string;
  image?: string;
  align?: 'left' | 'right';
};

// ===== DB layer shape =====
type CategoryCore = {
  categories_id: number;
  categories_image: string;
};

// ===== Joined / enriched =====
export type CategoryContent = {
  categories_name: string;
};

// ===== API response =====
export type CategoryListBaseType = {
  category: CategoryCore;
  content: CategoryContent;
};

export type CategoryListItem = CategoryListBaseType & CategoryContent;

// ===== UI projection =====
export type CategoryBreadcrumbItem = {
  categories_id: number;
  categories_name: string;
};
