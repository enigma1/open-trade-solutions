import { db, dbTables, queryRows } from '>/lib/server/db';
import { getConfig } from '>/lib/server/config';
import { getSessionData } from '>/lib/server/sessions';
import { appErrors } from '>/lib/server/errors';
import type {
  LanguageStringsRow,
  LanguageRow,
  LanguagesMap,
  LanguagesType,
} from './types';

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
    const table = dbTables.languages_strings;
    const rows = await queryRows<LanguageStringsRow>({
      query: `
        SELECT string_key, string_value
        FROM ${table}
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

const resolveLanguage = async (languageId?: number): Promise<LanguagesType> => {
  const languages = await getAllLanguages();

  // Explicit language ID
  if (languageId !== undefined) {
    const language = Object.values(languages).find(
      (l) => l.languages_id === languageId,
    );

    if (language) return language;
  }

  // Session language
  const sessionLang = await getLanguageFromSession();

  if (sessionLang && languages[sessionLang]) {
    return languages[sessionLang];
  }

  // Default language
  const defaultLanguageId = await getConfig('languages.default');

  const defaultLanguage = Object.values(languages).find(
    (l) => l.languages_id === parseInt(defaultLanguageId, 10),
  );

  if (defaultLanguage) return defaultLanguage;

  throw appErrors.server({
    message: 'invalid_language',
    details: ['No valid language found'],
  });
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

const getLanguageFromSession = async () => {
  const sessionData = getSessionData();
  if (
    !sessionData ||
    !sessionData.prefs.lang ||
    !languagesCache?.[sessionData.prefs.lang]
  )
    return null;
  return sessionData.prefs.lang;
};

const getAllLanguages = async (): Promise<LanguagesMap> => {
  const lTable = dbTables.languages;

  if (!languagesCache) {
    const query = `SELECT * FROM ${lTable} WHERE status = 1 ORDER BY sort_order`;
    const [rows] = await db.query<LanguageRow[]>(query);
    languagesCache = Object.fromEntries(rows.map((r) => [r.code, r]));
  }
  return languagesCache;
};

export const languageApi = {
  getTranslator,
  resolveLanguage,
  getAllLanguages,
  getLanguageFromSession,
};
