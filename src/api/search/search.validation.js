import { z } from 'zod';

export const searchInputSchema = z
  .object({
    query: z.string().min(1, 'Search query cannot be empty').trim(),
    categoryLimit: z.number().int().nonnegative().optional(),
    subcategoryLimit: z.number().int().nonnegative().optional(),
    productLimit: z.number().int().nonnegative().optional()
  })
  .strict();
