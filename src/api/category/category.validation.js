import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  breadcrumb: z.string().min(1),
  oldPath: z.string().nullable().optional(),
  newPath: z.string().min(1),
  posterImageUrl: z.string().url().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),
  seoSchema: z.string().nullable().optional(),
  lastEditedBy: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().min(1)
});

export const getCategoryByPathSchema = z.object({
  path: z.string().min(1)
});
