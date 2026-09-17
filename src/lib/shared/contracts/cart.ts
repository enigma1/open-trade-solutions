import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.number().int().positive(),
  qty: z.number().int().positive(),
  fields: z.array(z.number().int().positive()).optional(),
});
