// import { queryRows } from '>/lib/server/db';
// import { LanguageStringsRow } from './types';

// const stringsCache: Record<string, Record<string, string>> = {};

// export const getCookie = (request: Request, name: string) => {
//   const cookieHeader = request.headers.get('cookie');
//   if (!cookieHeader) return null;

//   const cookies = Object.fromEntries(
//     cookieHeader.split('; ').map((c) => {
//       const [key, ...rest] = c.split('=');
//       return [key, rest.join('=')];
//     })
//   );

//   return cookies[name] ?? null;
// };

// export const resolveLanguage = (request: Request, url: URL) => {
//   const paramsLang = url.searchParams.get('lang');
//   const cookieLang = getCookie(request, 'lang');

//   return paramsLang || cookieLang || 'en';
// };

// const createTranslator = (strings: Record<string, string>) => {
//   return (key: string, vars: Record<string, string> = {}) => {
//     const template = strings[key] || key;
//     return template.replace(/{{(.*?)}}/g, (_, k) => {
//       return vars[k.trim()] ?? '';
//     });
//   };
// };

// export const loadLanguageStrings = async (lang: string) => {
//   if (!stringsCache[lang]) {
//     const rows = await queryRows<LanguageStringsRow>({
//       query: `
//         SELECT string_key, string_value
//         FROM language_strings
//         WHERE language = ?
//       `,
//       params: [lang],
//     });

//     stringsCache[lang] = Object.fromEntries(
//       rows.map((r) => [r.string_key, r.string_value]),
//     );
//   }

//   return createTranslator(stringsCache[lang]);
// };
