import { queryRows } from '>/lib/server/db';
import type { ConfigurationRow } from './types';

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

export const getConfigMultiple = async (keys: ConfigMultipleKeys) => {
  const entries = await Promise.all(
    Object.entries(keys).map(async ([rKey, cfgKey]) => {
      const value = await getConfig(cfgKey);
      return [rKey, value] as const;
    }),
  );
  return Object.fromEntries(entries);
};

export const resetConfigCache = () => {
  configCache = null;
};
