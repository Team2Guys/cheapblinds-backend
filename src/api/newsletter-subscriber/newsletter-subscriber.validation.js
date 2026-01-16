import { z } from 'zod';

export const createNewsletterSubscriberSchema = z.object({
  email: z.string().email(),
  isActive: z.boolean()
});

export const updateNewsletterSubscriberSchema = z.object({
  isActive: z.boolean()
});

export const sendNewsletterEmailSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  recipients: z.array(z.string().email()).min(1)
});
