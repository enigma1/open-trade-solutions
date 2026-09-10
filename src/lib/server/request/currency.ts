import { db } from '>/lib/server/db';
import { getConfig } from '>/lib/server/db/configuration';
import { CurrencyRow, CurrenciesMap } from './types';

let currenciesCache: CurrenciesMap | null = null;

// Public API
const resolveCurrency = async (cookieCu: string, paramsCu?: string) => {
  const currencies = await getAllCurrencies();

  if (paramsCu && currencies[paramsCu]) return paramsCu;
  if (cookieCu && currencies[cookieCu]) return cookieCu;

  const defaultCurrencyId = await getConfig('currencies.default');

  const defaultLanguage = Object.values(currencies).find(
    (cu) => cu.currencies_id === parseInt(defaultCurrencyId, 10),
  );

  return defaultLanguage?.code || Object.keys(currencies)[0] || 'USD';
};

// const getCurrencyByCode = async (code: string) => {
//   const languages = await getAllCurrencies();
//   return languages[code];
// };

const getAllCurrencies = async (): Promise<CurrenciesMap> => {
  if (!currenciesCache) {
    const query = `SELECT * FROM currencies WHERE status = 1 ORDER BY sort_order`;
    const [rows] = await db.query<CurrencyRow[]>(query);
    currenciesCache = Object.fromEntries(rows.map((r) => [r.code, r]));
  }
  return currenciesCache;
};

export const currencyApi = {
  resolveCurrency,
  getAllCurrencies,
};
