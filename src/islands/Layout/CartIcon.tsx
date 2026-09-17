import { ShoppingCartIcon } from "lucide-react";
import { cartStore } from ">/client/app";

const { useCartStore } = cartStore;

export const CartIcon = () => {
  const { totalQty } = useCartStore(({ api }) => ({
    totalQty: api.getTotalQuantity(),
  }));

  return (
    <a href="/cart" className="cart-link">
      <ShoppingCartIcon size={24} />
      {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
    </a>
  );
};
