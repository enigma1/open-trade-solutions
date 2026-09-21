import { localeApi } from '>/lib/server/locale';

export async function GET() {
  const locale = await localeApi.resolve();
  return Response.json(locale);
}
