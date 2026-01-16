import { z } from 'zod';

export const createNewsletterSubscriberSchema = z
  .object({
    email: z.string().email('Invalid email').trim(),
    isActive: z.boolean()
  })
  .strict();

export const updateNewsletterSubscriberSchema = z
  .object({
    isActive: z.boolean()
  })
  .strict();

export const sendNewsletterEmailSchema = z
  .object({
    subject: z.string().min(1, 'Subject is required').trim(),
    body: z.string().min(1, 'Body is required').trim(),
    recipients: z
      .array(z.string().email('Invalid recipient email'))
      .min(1, 'At least one recipient is required')
  })
  .strict();
