import { z } from 'zod';

export const updateUserSchema = z
  .object({
    defaultShippingAddressId: z.string().nullable().optional().trim(),
    defaultBillingAddressId: z.string().nullable().optional().trim(),
    firstName: z.string().min(1, 'First name is required').optional().trim(),
    lastName: z.string().min(1, 'Last name is required').optional().trim(),
    email: z.string().email('Invalid email').optional().trim()
  })
  .strict();
