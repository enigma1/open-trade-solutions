import type { ProductField } from './product';

export type CartItem = {
  productId: number;
  qty: number;
  fields?: number[];
};
