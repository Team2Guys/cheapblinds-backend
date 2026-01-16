import { z } from 'zod';

export const createInquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().nullable().optional(),
  inquiryType: z.enum(['EMAIL', 'PHONE', 'WHATSAPP', 'OTHER']).optional()
});

export const updateInquirySchema = z.object({
  inquiryStatus: z.enum(['NEW', 'READ', 'RESOLVED'])
});

export const getInquiryByIdSchema = z.object({
  id: z.string().min(1)
});
