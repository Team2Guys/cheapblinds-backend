import { z } from 'zod';

const baseSubcategory = {
  categoryId: z.string().trim().min(1, 'Category ID is required'),
  name: z.string().trim().min(1, 'Name is required'),
  shortDescription: z.string().trim().min(1, 'Short description is required'),
  description: z.string().trim().min(1, 'Description is required'),
  breadcrumb: z.string().trim().min(1, 'Breadcrumb is required'),

  oldPath: z.string().trim().nullable().optional(),
  newPath: z.string().trim().min(1, 'New path is required'),

  metaTitle: z.string().trim().min(1, 'Meta title is required'),
  metaDescription: z.string().trim().min(1, 'Meta description is required'),
  canonicalUrl: z.string().trim().min(1, 'Canonical URL is required'),
  posterImageUrl: z.string().trim().min(1, 'Poster image URL is required'),
  lastEditedBy: z.string().trim().min(1, 'Last edited by is required'),
  seoSchema: z.string().trim().min(1, 'SEO schema is required'),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
};

export const createSubcategorySchema = z.object(baseSubcategory).strict();

export const updateSubcategorySchema = createSubcategorySchema
  .extend({
    id: z.string().min(1, 'Subcategory ID is required').trim()
  })
  .strict();

export const getSubcategoryByPathSchema = z
  .object({
    path: z.string().min(1, 'Path is required').trim()
  })
  .strict();
