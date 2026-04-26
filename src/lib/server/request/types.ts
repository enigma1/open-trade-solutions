import { type RowDataPacket } from 'mysql2';
export type LanguageStringsRow = RowDataPacket & {
  string_key: string;
  string_value: string;
};

type LanguagesType = {
  languages_id: number;
  code: string;
  name: string;
};
export type LanguagesMap = Record<string, LanguagesType>;
export type LanguageRow = RowDataPacket & LanguagesType;

type CurrenciesType = {
  currencies_id: number;
  code: string;
  name: string;
  type: 'fiat' | 'crypto' | 'custom';
  symbol_position: 'left' | 'right';
  decimal_places: number;
  rate: number;
};
export type CurrenciesMap = Record<string, CurrenciesType>;
export type CurrencyRow = RowDataPacket & CurrenciesType;

// export type CookieStoreContext = {
//   language?: string;
//   currency?: string;
//   locale?: string;
// };

export type StoreContext = {
  lang: string;
  cu: string;
  locale: string;
};
