import { z } from 'zod';

export const AppErrorSchema = z.object({
  type: z.enum(['auth', 'db', 'schema', 'server']),
  status: z.number(),
  message: z.string(),
  details: z.array(z.string()).optional(),
});
