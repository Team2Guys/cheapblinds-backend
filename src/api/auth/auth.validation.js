import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const signinSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']).optional()
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email')
});

export const passwordUpdateSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  resetToken: z.string().min(1, 'Reset token is required')
});
