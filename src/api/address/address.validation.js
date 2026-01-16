import { z } from 'zod';

export const addressTypeEnum = z.enum(['HOME', 'OFFICE', 'OTHER']);

const baseAddress = {
  userId: z.string().min(1, 'User ID is required').trim(),
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  email: z.string().email('Invalid email').trim(),
  phone: z.string().min(5, 'Phone number is too short').trim(),
  state: z.string().min(1, 'State is required').trim(),
  country: z.string().min(1, 'Country is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  address: z.string().min(1, 'Address is required').trim(),
  addressType: addressTypeEnum
};

export const createAddressSchema = z.object(baseAddress).strict();

export const updateAddressSchema = z
  .object({
    ...Object.fromEntries(
      Object.entries(baseAddress).map(([k, v]) => [k, v.optional().nullable()])
    )
  })
  .strict();

export const addressIdSchema = z
  .object({
    id: z.string().min(1, 'Address ID is required').trim()
  })
  .strict();

export const addressListByUserSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required').trim()
  })
  .strict();
