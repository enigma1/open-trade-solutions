import { getSessionData } from '>/lib/server/sessions';
import { getDefaultUserPrefs } from '>/lib/server/config';

export const calculatePageNumber = (offset: number, limit: number) => {
  if (
    !Number.isInteger(offset) ||
    !Number.isInteger(limit) ||
    offset < 0 ||
    limit <= 0 ||
    offset % limit !== 0
  ) {
    return 1;
  }

  return offset / limit + 1;
};

export const getPage = (value: string | null) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const getLimitOffset = async (page: number) => {
  const initialPrefs = await getDefaultUserPrefs();
  const { itemsPerPage } = getSessionData()?.prefs ?? initialPrefs;

  return {
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
  };
};
