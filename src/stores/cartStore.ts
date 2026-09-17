import { makeFactoryState } from "./estate";
import type { CartItem } from ">/lib/shared/types";

type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateItem: (item: CartItem) => void;
  getTotalQuantity: () => number;
  clear: () => void;
};

export type CartStore = {
  useCartStore: <
    TSelected = {
      state: CartState;
      api: CartActions;
    },
  >(
    selector?: (args: { state: CartState; api: CartActions }) => TSelected,
  ) => TSelected;

  get: () => CartState;
  api: CartActions;
};

const itemKey = (item: CartItem): string =>
  `${item.productId}:${JSON.stringify(
    (item.fields ?? []).slice().sort((a, b) => a - b),
  )}`;

export const createCartStore = () => {
  const baseStore = makeFactoryState<CartState>(() => ({
    items: [],
  }))();

  const { get, set, setAuto } = baseStore;

  const api: CartActions = {
    addItem: (item) => {
      const key = itemKey(item);
      const existing = get().items.find((i) => itemKey(i) === key);

      if (existing) {
        setAuto((state) => ({
          items: state.items.map((i) =>
            itemKey(i) === key ? { ...i, qty: i.qty + item.qty } : i,
          ),
        }));
      } else {
        setAuto((state) => ({
          items: [...state.items, item],
        }));
      }
    },

    removeItem: (item) => {
      const key = itemKey(item);
      setAuto((state) => ({
        items: state.items
          .map((i) =>
            itemKey(i) === key ? { ...i, qty: i.qty - item.qty } : i,
          )
          .filter((i) => i.qty > 0),
      }));
    },

    updateItem: (item) => {
      const key = itemKey(item);
      setAuto((state) => ({
        items: state.items
          .map((i) => (itemKey(i) === key ? { ...i, qty: item.qty } : i))
          .filter((i) => i.qty > 0),
      }));
    },

    clear: () => {
      setAuto({
        items: [],
      });
    },

    getTotalQuantity: () =>
      get().items.reduce((sum, item) => sum + item.qty, 0),
  };

  type SelectorProps = {
    state: CartState;
    api: CartActions;
  };

  const useCartStore = <TSelected = SelectorProps>(
    selector?: (args: SelectorProps) => TSelected,
  ): TSelected => {
    const state = baseStore();

    const store = {
      state,
      api,
    };

    return selector ? selector(store) : (store as TSelected);
  };

  return {
    useCartStore,
    get,
    api,
  };
};
