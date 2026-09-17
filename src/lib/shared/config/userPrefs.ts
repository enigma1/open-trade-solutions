import { type UserPrefs, pageSizeValues } from ">/lib/shared/contracts";
import { themes } from "./themes";
export const defaultUserPrefs: UserPrefs = {
  theme: themes[0],
  productsPerPage: pageSizeValues[0],
  sort: "asc",
};
