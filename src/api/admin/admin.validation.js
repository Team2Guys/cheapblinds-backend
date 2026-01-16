import { z } from 'zod';

const roles = z.enum(['ADMIN', 'SUPER_ADMIN']);
const permissions = z.enum([
  'ADD_PRODUCTS',
  'EDIT_PRODUCTS',
  'DELETE_PRODUCTS',
  'ADD_CATEGORY',
  'DELETE_CATEGORY',
  'EDIT_CATEGORY',
  'CHECK_PROFIT',
  'CHECK_REVENUE',
  'CHECK_VISITORS',
  'VIEW_USERS',
  'VIEW_SALES',
  'VIEW_ADMINS',
  'VIEW_TOTAL_PRODUCTS',
  'VIEW_TOTAL_CATEGORIES'
]);

export const createAdminSchema = z
  .object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.email('Invalid email').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    role: roles,
    permissions: z
      .array(permissions)
      .min(1, 'At least one permission is required'),
    lastEditedBy: z.string().min(1, 'Last edited by is required').trim()
  })
  .strict();

export const updateAdminSchema = z
  .object({
    name: baseAdmin.name.optional(),
    email: baseAdmin.email.optional(),
    role: baseAdmin.role.optional(),
    permissions: z.array(permissions).optional(),
    lastEditedBy: baseAdmin.lastEditedBy.optional()
  })
  .strict();
