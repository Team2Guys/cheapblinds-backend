import { z } from 'zod';

export const addressTypeEnum = z.enum(['HOME', 'OFFICE', 'OTHER']);

export const createAddressSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required').trim(),
    firstName: z.string().min(1, 'First name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    email: z.email('Invalid email').trim(),
    phone: z.string().min(5, 'Phone number is too short').trim(),
    state: z.string().min(1, 'State is required').trim(),
    country: z.string().min(1, 'Country is required').trim(),
    city: z.string().min(1, 'City is required').trim(),
    address: z.string().min(1, 'Address is required').trim(),
    addressType: addressTypeEnum
  })
  .strict();

export const updateAddressSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required').trim().optional(),
    firstName: z.string().min(1, 'First name is required').trim().optional(),
    lastName: z.string().min(1, 'Last name is required').trim().optional(),
    email: z.email('Invalid email').trim().optional(),
    phone: z.string().min(5, 'Phone number is too short').trim().optional(),
    state: z.string().min(1, 'State is required').trim().optional(),
    country: z.string().min(1, 'Country is required').trim().optional(),
    city: z.string().min(1, 'City is required').trim().optional(),
    address: z.string().min(1, 'Address is required').trim().optional(),
    addressType: addressTypeEnum.optional()
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
