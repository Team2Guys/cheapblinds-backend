import { z } from 'zod';

export const getPricingSchema = z
  .object({
    drop: z.number().positive('Drop must be positive'),
    width: z.number().positive('Width must be positive'),
    fabricId: z.number().int().positive('Fabric ID must be positive integer'),
    blindTypeId: z
      .number()
      .int()
      .positive('Blind type ID must be positive integer')
  })
  .strict();
