import { z } from 'zod';

export const addressTypeEnum = z.enum(['HOME', 'OFFICE', 'OTHER']);

export const createAddressSchema = z.object({
  userId: z.string().min(1),

  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),

  state: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),

  addressType: addressTypeEnum
});

export const updateAddressSchema = z.object({
  userId: z.string().min(1).optional(),

  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).optional(),

  state: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  address: z.string().min(1).optional(),

  addressType: addressTypeEnum.optional()
});

export const addressIdSchema = z.object({
  id: z.string().min(1)
});

export const addressListByUserSchema = z.object({
  userId: z.string().min(1)
});
