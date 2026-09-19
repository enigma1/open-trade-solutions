import { z } from "zod";

export const basePaginationSchema = {
  paging: z
    .object({
      hasNext: z.boolean(),
      hasPrevious: z.boolean(),
    })
    .optional(),
};
