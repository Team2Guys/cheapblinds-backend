import { z } from 'zod';

const baseCategory = {
  name: z.string().trim().min(1, 'Category name is required'),
  shortDescription: z.string().trim().min(1, 'Short description is required'),
  description: z.string().trim().min(1, 'Description is required'),
  breadcrumb: z.string().trim().min(1, 'Breadcrumb is required'),
  oldPath: z.string().trim().nullable().optional(),
  newPath: z.string().trim().min(1, 'New path is required'),
  posterImageUrl: z.string().trim().url('Invalid URL').nullable().optional(),
  metaTitle: z.string().trim().nullable().optional(),
  metaDescription: z.string().trim().nullable().optional(),
  canonicalUrl: z.string().trim().nullable().optional(),
  seoSchema: z.string().trim().nullable().optional(),
  lastEditedBy: z.string().trim().min(1, 'Last edited by is required'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
};

export const createCategorySchema = z.object(baseCategory).strict();

export const updateCategorySchema = createCategorySchema
  .partial()
  .extend({
    id: z.string().min(1, 'Category ID is required').trim()
  })
  .strict();

export const getCategoryByPathSchema = z
  .object({
    path: z.string().min(1, 'Path is required').trim()
  })
  .strict();
