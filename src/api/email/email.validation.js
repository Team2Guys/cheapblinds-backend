import { z } from 'zod';

export const checkVerificationTokenSchema = z
  .object({
    verificationToken: z
      .string()
      .min(1, 'Verification token is required')
      .trim()
  })
  .strict();

export const sendVerificationTokenSchema = z
  .object({
    email: z.string().email('Invalid email address').trim()
  })
  .strict();
