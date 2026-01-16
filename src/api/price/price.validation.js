import { z } from 'zod';

export const getPricingSchema = z
  .object({
    drop: z.number().nonnegative('Drop must be positive'),
    width: z.number().nonnegative('Width must be positive'),
    fabricId: z
      .number()
      .int()
      .nonnegative('Fabric ID must be positive integer'),
    blindTypeId: z
      .number()
      .int()
      .nonnegative('Blind type ID must be positive integer')
  })
  .strict();
