export const routes = {
  product: (id: number) => `/product-info?products=${id}`,
  category: (id: number) => `/products-listing?categories=${id}`,
  brand: (id: number) => `/products-listing?brands=${id}`,
};
