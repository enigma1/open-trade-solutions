import { getUniqueNumberedList } from '@/lib/shared/utils';
import {
  getCategoriesBreadcrumb,
  getCategoriesDescriptions,
} from '@/lib/server/categories';
import type { TranslatorFn } from './types';

export const buildCategoriesListingContext = async (
  params: URLSearchParams,
  t: TranslatorFn,
) => {
  const ids = getUniqueNumberedList(params.get('categories'));

  if (ids.length === 1) {
    const breadcrumb = await getCategoriesBreadcrumb(ids[0]);
    const data = await getCategoriesDescriptions([ids[0]]);

    return {
      title: t('categories.listing.title.one', {
        name: data[0].categories_name,
      }),
      type: 'category',
      breadcrumb,
      entity: {
        name: data[0].categories_name,
        description: data[0].categories_description,
        image: data[0].categories_image,
      },
    };
  }

  return {
    title: t('categories.listing.title.all'),
    type: 'multiple',
    breadcrumb: [],
  };
};
