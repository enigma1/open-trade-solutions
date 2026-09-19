import { loadEnvFile } from "node:process";

export const REDIRECT_MARKER = "ps-rdr";
export const PROBE_COOKIE_ID = "ps-id";
export const PROBE_COOKIE_LIFETIME = 5 * 60; // 5 minutes
export const SHOP_COOKIE_ID = "ots-id";
export const SHOP_COOKIE_LIFETIME = 60 * 60 * 24 * 30; // 30 days

loadEnvFile();
export const getEnvKey = (k: string) => process.env[k];
