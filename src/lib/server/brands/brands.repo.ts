import { queryRows, dbTables } from '>/lib/server/db';
import { routes } from '>/lib/shared/routes';
import { languageApi } from '>/lib/server/request/language';

import type { BrandDescriptionRow } from './types';

export const getBrandsDescriptions = async (
  bIds: number[],
): Promise<BrandDescriptionRow[]> => {
  if (!bIds.length) return [];

  const languageId = (await languageApi.resolveLanguage()).languages_id;
  const bdTable = dbTables.brands_description;
  const placeholders = bIds.map(() => '?').join(',');
  const query = `SELECT * FROM ${bdTable} WHERE brands_id IN (${placeholders}) AND language_id = ?`;
  const rows = await queryRows<BrandDescriptionRow>({
    query,
    params: [...bIds, languageId],
  });
  return rows;
};

export const getBrandBreadcrumbContent = async (brandId: number) => {
  const content = await getBrandsDescriptions([brandId]);
  if (content.length) {
    return {
      content: {
        brands_id: content[0].brands_id,
        brands_name: content[0].brands_name,
      },
    };
  }
};

export const getBrandBreadcrumb = async (brandId: number) => {
  const brandContent = await getBrandBreadcrumbContent(brandId);
  if (brandContent) {
    return {
      label: brandContent.content.brands_name,
      href: routes.brand(brandContent.content.brands_id),
    };
  }
};
