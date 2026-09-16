import { CartItem } from '>/lib/client/types/cart';

export const AddToCartButton = ({ productId, fields, qty }: CartItem) => {
  const handleClick = () => {
    console.log('Add to cart clicked', { productId, fields, qty });
  };

  return (
    <button
      type='button'
      className='rounded transition px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700'
      onClick={handleClick}
    >
      Add to cart
    </button>
  );
};
