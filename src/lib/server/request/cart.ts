import { getSessionData } from '>/lib/server/sessions';
import { CartItem } from '>/lib/shared/types';

const getItems = async () => {
  const sessionData = getSessionData();
  if (!sessionData) {
    return [];
  }
  return sessionData.cart || [];
};

const setItems = async (items: CartItem[]) => {
  const sessionData = getSessionData();
  if (!sessionData) {
    return;
  }
  sessionData.cart = items;
};

const addItem = async (item: CartItem) => {
  const sessionData = getSessionData();
  if (!sessionData) {
    return;
  }
  const existingItemIndex = sessionData.cart.findIndex(
    (cartItem) => cartItem.productId === item.productId,
  );
  if (existingItemIndex !== -1) {
    // If the item already exists in the cart, update the quantity
    sessionData.cart[existingItemIndex].qty += item.qty;
  } else {
    // If the item does not exist in the cart, add it
    sessionData.cart.push(item);
  }
};

export const cartApi = {
  getItems,
  setItems,
  addItem,
};
