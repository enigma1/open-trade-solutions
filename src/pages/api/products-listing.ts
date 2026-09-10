import type { APIContext } from 'astro';
import { getProducts } from '>/lib/server/repos';
import { ProductsQuerySchema } from '>/lib/server/products/products.schema';

export async function GET({ url }: { url: URL }) {
  const raw = Object.fromEntries(url.searchParams.entries());
  const query = ProductsQuerySchema.pick({
    limit: true,
    offset: true,
    categories: true,
    sort: true,
  }).parse({
    ...raw,
    categories: raw.categories ? raw.categories.split(',').map(Number) : [],
  });
  const products = await getProducts(query);
  return Response.json(products);
}

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const query = ProductsQuerySchema.parse(body);
  const products = await getProducts(query);
  return Response.json(products);
}
