import { AstroGlobal } from 'astro';
import { getUniqueNumberedList, limitList } from '>/lib/shared/utils';

type ListingParams = {
  categories: number[];
  brands: number[];
  // zones: number[];
  // topics: number[];
};

export const parseListingParams = (
  searchParams: URLSearchParams,
): ListingParams => {
  const parse = (key: string) => {
    const value = searchParams.get(key);
    if (!value) return [];
    return limitList(getUniqueNumberedList(value), 20);
  };

  return {
    categories: parse('categories'),
    brands: parse('brands'),
    // zones: parse('zones'),
    // topics: parse('topics'),
  };
};

export const resolveGroupedListingContext = async (Astro: AstroGlobal) => {
  const params = parseListingParams(new URL(Astro.request.url).searchParams);
};
