import { db, queryRows } from '>/lib/server/db';
import { CategoryBreadcrumbType } from '>/lib/shared/types';
import type { CategoryPathItem, CategoryDescriptionRow } from './types';
import { routes } from '>/lib/shared/routes';

export const getCategories = async () => {
  const [rows] = await db.query(
    'SELECT c.categories_id, cd.categories_name FROM categories c left join categories_description cd on (c.categories_id = cd.categories_id) AND cd.language_id = ?',
    [1], // Replace 1 with the actual language ID as needed
  );

  return rows;
};

export const getCategoryPath = async (id: number) => {
  const query = `
    WITH RECURSIVE cat_path AS (
      SELECT categories_id, parent_id, 0 AS depth
      FROM categories
      WHERE categories_id = ?

      UNION ALL

      SELECT c.categories_id, c.parent_id, cp.depth + 1
      FROM categories c
      JOIN cat_path cp ON cp.parent_id = c.categories_id
    )
    SELECT categories_id, parent_id
    FROM cat_path
    ORDER BY depth DESC;
  `;

  const rows = await queryRows<CategoryPathItem>({
    query,
    params: [id],
  });
  return rows;
};

export const getCategoriesDescriptions = async (
  cIds: number[],
  languageId = 1,
): Promise<CategoryDescriptionRow[]> => {
  if (!cIds.length) return [];

  const placeholders = cIds.map(() => '?').join(',');
  const query = `SELECT * FROM categories_description WHERE categories_id IN (${placeholders}) AND language_id = ?`;
  const rows = await queryRows<CategoryDescriptionRow>({
    query,
    params: [...cIds, languageId],
  });
  return rows;
};

export const mapCategoriesBreadcrumb = (items: CategoryBreadcrumbType[]) => {
  return items.map((c) => ({
    label: c.content.categories_name,
    href: routes.category(c.content.categories_id),
  }));
};

export const getCategoriesBreadcrumbContent = async (categoryId: number) => {
  if (!categoryId) return [];
  const pcIds = await getCategoryPath(categoryId);
  if (!pcIds.length) return [];

  const ids = pcIds.map((c) => c.categories_id);
  const content = await getCategoriesDescriptions(ids);

  const map = new Map(content.map((d) => [d.categories_id, d]));

  const data = ids.map((id) => ({
    content: {
      categories_id: id,
      categories_name: map.get(id)?.categories_name ?? '',
    },
  }));
  return data;
};

export const getCategoriesBreadcrumb = async (categoryId: number) => {
  const data = await getCategoriesBreadcrumbContent(categoryId);
  return mapCategoriesBreadcrumb(data);
};
