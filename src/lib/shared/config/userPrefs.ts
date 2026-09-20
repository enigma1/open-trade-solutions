import { type UserPrefs } from ">/lib/shared/contracts";
import { pageSizeValues } from ">/lib/server/contracts";
import { themes } from "./themes";

export const defaultUserPrefs: UserPrefs = {
  theme: themes[0],
  itemsPerPage: pageSizeValues[0],
  sort: "asc",
  lang: 1,
  cu: 1,
  locale: "en",
};
