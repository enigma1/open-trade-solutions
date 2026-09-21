import { db, dbTables, dbAliases, queryRows } from '>/lib/server/db';
import { CategoryBreadcrumbType } from '>/lib/shared/types';
import type { CategoryPathItem, CategoryDescriptionRow } from './types';
import { routes } from '>/lib/shared/routes';

type GetCategoryPathProps = {
  cId: number;
  rId?: number;
  cLimit?: number;
};

export const getCategoryPath = async ({
  cId,
  rId,
  cLimit = 20,
}: GetCategoryPathProps) => {
  const limit = Math.max(1, cLimit);

  const cAlias = dbAliases.categories;
  const cTable = dbTables.categories;

  const query = `
    WITH RECURSIVE cat_path AS (
      SELECT ${cAlias}.*, 0 AS depth
      FROM ${cTable} ${cAlias}
      WHERE ${cAlias}.categories_id = ?
      UNION ALL
      SELECT ${cAlias}.*, cp.depth + 1
      FROM ${cTable} ${cAlias}
      JOIN cat_path cp
        ON ${cAlias}.categories_id = cp.parent_id
      WHERE cp.depth < ? AND (? = 0 OR cp.categories_id != ?)
    )
    SELECT *
    FROM cat_path
    ORDER BY depth ASC
  `;

  return queryRows<CategoryPathItem>({
    query,
    params: [cId, limit - 1, rId ?? 0, rId ?? 0],
  });
};

export const getCategoriesDescriptions = async (
  cIds: number[],
  languageId = 1,
): Promise<CategoryDescriptionRow[]> => {
  if (!cIds.length) return [];
  const cdTable = dbTables.categories_description;
  const placeholders = cIds.map(() => '?').join(',');
  const query = `SELECT * FROM ${cdTable} WHERE categories_id IN (${placeholders}) AND language_id = ?`;
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

  const pcIds = await getCategoryPath({ cId: categoryId, cLimit: 4 });
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
