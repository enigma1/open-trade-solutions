import type { APIContext } from "astro";
import { getProductsFromRequest } from ">/lib/server/products/product.service";
import { ProductsQuerySchema } from ">/lib/server/products/products.schema";

export async function GET({ url }: { url: URL }) {
  const products = await getProductsFromRequest(url.searchParams);
  return Response.json(products);
}

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const query = ProductsQuerySchema.parse(body);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else if (typeof value === "string") {
      params.set(key, value);
    }
  }
  const products = await getProductsFromRequest(params);
  return Response.json(products);
}
