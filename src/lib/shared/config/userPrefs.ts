import { type UserPrefs, pageSizeValues } from ">/lib/shared/contracts";
import { themes } from "./themes";

export const defaultUserPrefs: UserPrefs = {
  theme: themes[0],
  productsPerPage: pageSizeValues[0],
  sort: "asc",
  lang: 1,
  cu: 1,
  locale: "en",
};
