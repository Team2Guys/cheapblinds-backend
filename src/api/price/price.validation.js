import { z } from 'zod';

export const getPricingSchema = z.object({
  drop: z.number().positive(),
  width: z.number().positive(),
  fabricId: z.number().int().positive(),
  blindTypeId: z.number().int().positive()
});
