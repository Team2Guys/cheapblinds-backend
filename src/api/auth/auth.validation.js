import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(6, 'Password must be at least 6 characters').trim()
  })
  .strict();

export const signinSchema = z
  .object({
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(1, 'Password is required').trim(),
    role: z.enum(['ADMIN', 'SUPER_ADMIN']).optional()
  })
  .strict();

export const passwordResetRequestSchema = z
  .object({
    email: z.string().email('Invalid email').trim()
  })
  .strict();

export const passwordUpdateSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    resetToken: z.string().min(1, 'Reset token is required').trim()
  })
  .strict();
