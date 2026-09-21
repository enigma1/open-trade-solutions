import { currencyApi } from '>/lib/server/request/currency';
import { languageApi } from '>/lib/server/request/language';

export const localeApi = {
  async resolve() {
    const currency = await currencyApi.resolveCurrency();
    const language = await languageApi.resolveLanguage();

    // resolve language, country, timezone, etc.

    return {
      language,
      currency,
    };
  },
};
