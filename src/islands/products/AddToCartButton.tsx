import { cartStore } from ">/client/app";
import type { CartItem } from ">/lib/client";

export const AddToCartButton = ({ productId, fields, qty }: CartItem) => {
  const handleClick = () => {
    cartStore.api.addItem({ productId, fields, qty });
  };

  return (
    <button className="btn" onClick={handleClick} title={`Add ${qty}`}>
      Add to cart
    </button>
  );
};
