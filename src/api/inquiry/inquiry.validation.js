import { z } from 'zod';

export const createInquirySchema = z
  .object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email').trim(),
    phone: z.string().min(5, 'Phone number is too short').trim(),
    message: z.string().nullable().optional().trim(),
    inquiryType: z.enum(['EMAIL', 'PHONE', 'WHATSAPP', 'OTHER']).optional()
  })
  .strict();

export const updateInquirySchema = z
  .object({
    inquiryStatus: z.enum(['NEW', 'READ', 'RESOLVED'])
  })
  .strict();

export const getInquiryByIdSchema = z
  .object({
    id: z.string().min(1, 'Inquiry ID is required').trim()
  })
  .strict();
