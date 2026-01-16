import { z } from 'zod';

export const searchInputSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty'),
  categoryLimit: z.number().int().positive().optional(),
  subcategoryLimit: z.number().int().positive().optional(),
  productLimit: z.number().int().positive().optional()
});
