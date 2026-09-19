import { AstroGlobal } from "astro";
import { languageApi } from ">/lib/server/request/language";
import { ContextPostParams } from ">/lib/shared/types";
import { getDefaultUserPrefs } from ">/lib/server/config";

export const createRequestContext = async (Astro: AstroGlobal) => {
  const formData =
    Astro.request.method === "POST"
      ? await Astro.request
          .clone()
          .formData()
          .catch(() => null)
      : null;

  const ctxParams = {
    cu: formData?.get("currency")?.toString(),
    lang: formData?.get("lang")?.toString(),
  } satisfies ContextPostParams;
  const defaultPrefs = await getDefaultUserPrefs();

  const sessionData = Astro.locals.session?.session_data;
  const lang = ctxParams.lang ?? sessionData?.prefs.lang ?? defaultPrefs.lang;
  const cu = ctxParams.cu ?? sessionData?.prefs.cu ?? defaultPrefs.cu;
  const locale = sessionData?.prefs.locale ?? defaultPrefs.locale;
  const url = new URL(Astro.request.url);
  url.searchParams.set("lang", String(lang));
  const t = await languageApi.getTranslator(String(lang));

  return {
    locale,
    cu,
    lang,
    t,
    url,
  };
};
