import { ShoppingCartIcon } from "lucide-react";
import { cartStore } from ">/client/app";

const { useCartStore } = cartStore;

type CartIconProps = {
  cookiesDisabled?: boolean;
};

export const CartIcon = ({ cookiesDisabled = false }: CartIconProps) => {
  const { totalQty } = useCartStore(({ api }) => ({
    totalQty: api.getTotalQuantity(),
  }));

  return (
    <a href="/cart" className="cart-link">
      <ShoppingCartIcon size={24} />
      {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
      {cookiesDisabled && (
        <span className="cart-cookie-warning" title="Cookies are disabled">
          !
        </span>
      )}
    </a>
  );
};