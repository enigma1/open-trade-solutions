import { currencyApi, languageApi } from '>/lib/server/request';

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
