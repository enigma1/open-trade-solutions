import { z } from "zod";
import { PageSizeSchema } from ">/lib/server/contracts";

const noTrim = (name: string) =>
  z
    .string()
    .refine(
      (v) => v === v.trim(),
      `${name} must not contain leading or trailing whitespace`,
    );

export const UserPrefsSchema = z.object({
  theme: noTrim("theme").min(1).max(256),
  itemsPerPage: PageSizeSchema,
  sort: z.enum(["asc", "desc"]).optional(),
  cu: z.number().int().positive(),
  lang: z.number().int().positive(),
  locale: noTrim("locale").min(2).max(16),
});

export type UserPrefs = z.infer<typeof UserPrefsSchema>;

const AppInfoSchema = z.object({
  storageVersion: z.number().int().positive(),
  appVersion: z.number().int().positive(),
  buildDate: z.coerce.date(),
});

export const AppConfigSchema = z.object({
  userPrefs: UserPrefsSchema,
  appInfo: AppInfoSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
