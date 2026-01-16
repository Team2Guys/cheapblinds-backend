import { z } from 'zod';

export const createSubcategorySchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  breadcrumb: z.string().min(1),

  oldPath: z.string().nullable().optional(),
  newPath: z.string().min(1),

  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  canonicalUrl: z.string().min(1),
  posterImageUrl: z.string().min(1),
  lastEditedBy: z.string().min(1),
  seoSchema: z.string().min(1),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
});

export const updateSubcategorySchema = createSubcategorySchema.extend({
  id: z.string().min(1)
});

export const getSubcategoryByPathSchema = z.object({
  path: z.string().min(1)
});
