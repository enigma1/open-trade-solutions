import { queryRows } from ">/lib/server/db";
import type { ConfigurationRow } from "./types";
import type { UserPrefs } from ">/lib/shared/contracts";

// Load configuration into memory when server starts
let configCache: Record<string, string> | null = null;

export const getConfig = async (key: string): Promise<string> => {
  if (!configCache) {
    const rows = await queryRows<ConfigurationRow>({
      query: `
        SELECT config_key, config_value
        FROM configuration
      `,
      params: [],
    });

    configCache = Object.fromEntries(
      rows.map((r) => [r.config_key, r.config_value]),
    );
  }

  const value = configCache?.[key];

  if (value !== undefined) return value;

  throw new Error(`Missing config: ${key}`);
};

type ConfigMultipleKeys<T = Record<string, string>> = {
  [K in keyof T]: string;
};

export const getConfigMultiple = async <T extends Record<string, string>>(
  keys: T,
) => {
  const entries = await Promise.all(
    Object.entries(keys).map(async ([rKey, cfgKey]) => {
      const value = await getConfig(cfgKey);
      return [rKey, value] as const;
    }),
  );
  return Object.fromEntries(entries) as ConfigMultipleKeys<T>;
};

export const resetConfigCache = () => {
  configCache = null;
};

export const getDefaultUserPrefs = async (): Promise<UserPrefs> => {
  const config = await getConfigMultiple({
    productsPerPage: "products.page_listing_size",
    theme: "theme.default",
    lang: "languages.default",
    cu: "currencies.default",
    locale: "locale.default",
  });

  return {
    theme: config.theme,
    productsPerPage: Number(config.productsPerPage),
    sort: "asc",
    lang: Number(config.lang),
    cu: Number(config.cu),
    locale: config.locale,
  };
};
