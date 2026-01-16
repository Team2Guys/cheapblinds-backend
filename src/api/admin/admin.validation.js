import { z } from 'zod';

// Reuse your GraphQL enums as Zod enums
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

export const createAdminSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: roles,
  permissions: z.array(permissions).min(1),
  lastEditedBy: z.string().min(1)
});

export const updateAdminSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: roles.optional(),
  permissions: z.array(permissions).optional(),
  lastEditedBy: z.string().min(1).optional()
});
