import { z } from 'zod';

// Only validate fields that can be updated
export const updateUserSchema = z.object({
  defaultShippingAddressId: z.string().nullable().optional(),
  defaultBillingAddressId: z.string().nullable().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional()
});
