import { db, queryRows } from '>/lib/server/db';
import { getConfig } from '>/lib/server/db/configuration';
import type { LanguageStringsRow, LanguageRow, LanguagesMap } from './types';

const stringsCache: Record<string, Record<string, string>> = {};
let languagesCache: LanguagesMap | null = null;

const createTranslator = (strings: Record<string, string>) => {
  return (key: string, vars: Record<string, string> = {}) => {
    const template = strings[key] || key;
    return template.replace(/{{(.*?)}}/g, (_, k) => {
      return vars[k.trim()] ?? '';
    });
  };
};

const getTranslatorById = async (languageId: number) => {
  if (!stringsCache[languageId]) {
    const rows = await queryRows<LanguageStringsRow>({
      query: `
        SELECT string_key, string_value
        FROM languages_strings
        WHERE language_id = ?
      `,
      params: [languageId],
    });

    stringsCache[languageId] = Object.fromEntries(
      rows.map((r) => [r.string_key, r.string_value]),
    );
  }
  return createTranslator(stringsCache[languageId]);
};

const resolveLanguage = async (cookieLang?: string, paramsLang?: string) => {
  const languages = await getAllLanguages();
  if (paramsLang && languages[paramsLang]) return paramsLang;
  if (cookieLang && languages[cookieLang]) return cookieLang;

  const defaultLanguageId = await getConfig('languages.default');

  const defaultLanguage = Object.values(languages).find(
    (l) => l.languages_id === parseInt(defaultLanguageId, 10),
  );

  return defaultLanguage?.code || Object.keys(languages)[0] || 'en';
};

const getLanguageByCode = async (code: string) => {
  const languages = await getAllLanguages();
  return languages[code];
};

// Public API
const getTranslator = async (code: string) => {
  const language = await getLanguageByCode(code);

  if (!language) {
    throw new Error(`Invalid language code: ${code}`);
  }

  return getTranslatorById(language.languages_id);
};

const getAllLanguages = async (): Promise<LanguagesMap> => {
  if (!languagesCache) {
    const query = `SELECT * FROM languages WHERE status = 1 ORDER BY sort_order`;
    const [rows] = await db.query<LanguageRow[]>(query);
    languagesCache = Object.fromEntries(rows.map((r) => [r.code, r]));
  }
  return languagesCache;
};

export const languageApi = {
  getTranslator,
  resolveLanguage,
  getAllLanguages,
};
