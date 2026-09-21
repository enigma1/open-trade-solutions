import { db, dbTables } from '>/lib/server/db';
import { getConfig } from '>/lib/server/config';
import { appErrors } from '>/lib/server/errors';
import { getSessionData } from '>/lib/server/sessions';
import { CurrencyRow, CurrenciesMap, CurrenciesType } from './types';

let currenciesCache: CurrenciesMap | null = null;

// Public API
const getCurrencyFromSession = () => {
  const sessionData = getSessionData();
  if (
    !sessionData ||
    !sessionData.prefs.cu ||
    !currenciesCache?.[sessionData.prefs.cu]
  )
    return null;
  return sessionData.prefs.cu;
};

const resolveCurrency = async (paramsCu?: number): Promise<CurrenciesType> => {
  const currencies = await getAllCurrencies();
  if (paramsCu !== undefined && currencies[paramsCu])
    return currencies[paramsCu];

  const sessionCu = getCurrencyFromSession();
  if (sessionCu) return currencies[sessionCu];

  const defaultCurrencyId = await getConfig('currencies.default');
  const defaultCurrency = Object.values(currencies).find(
    (cu) => cu.currencies_id === parseInt(defaultCurrencyId, 10),
  );
  if (defaultCurrency) return defaultCurrency;

  throw appErrors.server({
    message: 'invalid_currency',
    details: [`No valid currency found`],
  });
};

const getAllCurrencies = async (): Promise<CurrenciesMap> => {
  if (!currenciesCache) {
    const query = `SELECT * FROM ${dbTables.currencies} WHERE status = 1 ORDER BY sort_order`;
    const [rows] = await db.query<CurrencyRow[]>(query);
    currenciesCache = Object.fromEntries(rows.map((r) => [r.currencies_id, r]));
  }
  return currenciesCache;
};

const formatCurrency = (value: number, currency: CurrenciesType) => {
  const formattedValue = Number(value).toFixed(currency.decimal_places);
  return currency.symbol_position === 'left'
    ? `${currency.symbol} ${formattedValue}`
    : `${formattedValue} ${currency.code}`;
};

export const currencyApi = {
  resolveCurrency,
  getAllCurrencies,
  getCurrencyFromSession,
  formatCurrency,
};
