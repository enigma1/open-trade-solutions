import { z } from "zod";

export const literals = <
  const T extends readonly [string | number, ...(string | number)[]],
>(
  values: T,
) => z.union(values.map((value) => z.literal(value)) as any);

export const pageSizeValues = [25, 50, 100] as const;
export const PageSizeSchema = literals(pageSizeValues);
export type PageSize = z.infer<typeof PageSizeSchema>;

export const paginationRequestSchema = {
  page: z.coerce.number().int().min(1).optional(),
};

export const paginationResponseSchema = {
  paging: z
    .object({
      limit: PageSizeSchema,
      offset: z.coerce.number().int().min(0),
      hasPrevious: z.boolean(),
      hasNext: z.boolean(),
    })
    .optional(),
};
