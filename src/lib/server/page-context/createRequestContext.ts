import { AstroGlobal } from 'astro';
import { languageApi } from '>/lib/server/request/language';
import { resolveStoreContext } from '>/lib/server/request/context';
import { ContextPostParams } from '>/lib/shared/types';

export const createRequestContext = async (Astro: AstroGlobal) => {
  const formData =
    Astro.request.method === 'POST'
      ? await Astro.request
          .clone()
          .formData()
          .catch(() => null)
      : null;

  const ctxParams = {
    cu: formData?.get('currency')?.toString(),
    lang: formData?.get('lang')?.toString(),
  } satisfies ContextPostParams;

  const url = new URL(Astro.request.url);
  const { locale, cu, lang } = await resolveStoreContext({
    params: ctxParams,
    request: Astro.request,
    cookies: Astro.cookies,
  });

  const t = await languageApi.getTranslator(lang);

  return {
    locale,
    cu,
    lang,
    t,
    url,
  };
};
