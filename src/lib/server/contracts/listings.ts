import { z } from "zod";

export const basePaginationSchema = {
  paging: z
    .object({
      limit: z.coerce.number().int().min(1),
      offset: z.coerce.number().int().min(0),
    })
    .optional(),
};
