import type { UserPrefs } from ">/lib/shared/contracts";
import type { CartItem } from "./cart";
import type { CheckoutSteps } from "./checkout";

export type SessionsData = {
  prefs: UserPrefs;
  cart: CartItem[];
  checkout: CheckoutSteps;
};
