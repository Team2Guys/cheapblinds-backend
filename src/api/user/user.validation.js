import { z } from 'zod';

export const updateUserSchema = z
  .object({
    defaultShippingAddressId: z.string().trim().nullable().optional(),
    defaultBillingAddressId: z.string().trim().nullable().optional(),
    firstName: z.string().trim().min(1, 'First name is required').optional(),
    lastName: z.string().trim().min(1, 'Last name is required').optional(),
    email: z.email('Invalid email').trim().optional()
  })
  .strict();
