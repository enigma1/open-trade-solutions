// api/cart/items.ts
import type { APIContext } from 'astro';
import { CartItemsSchema } from '>/lib/shared/contracts';

import { cartApi } from '>/lib/server/request';

export const GET = async () => {
  const items = await cartApi.getItems();
  return Response.json(items);
};

export const POST = async ({ request }: APIContext) => {
  const body = await request.json();
  const items = CartItemsSchema.parse(body);
  return Response.json(items);
};
