import { getProductById } from '>/lib/server/products/product.service';

export async function GET({ url }: { url: URL }) {
  const id = Number(url.searchParams.get('id'));
  const product = await getProductById(id);
  return Response.json(product);
}
