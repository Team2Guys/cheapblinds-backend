import { z } from 'zod';

const baseSubcategory = {
  categoryId: z.string().min(1, 'Category ID is required').trim(),
  name: z.string().min(1, 'Name is required').trim(),
  shortDescription: z.string().min(1, 'Short description is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  breadcrumb: z.string().min(1, 'Breadcrumb is required').trim(),

  oldPath: z.string().nullable().optional().trim(),
  newPath: z.string().min(1, 'New path is required').trim(),

  metaTitle: z.string().min(1, 'Meta title is required').trim(),
  metaDescription: z.string().min(1, 'Meta description is required').trim(),
  canonicalUrl: z.string().min(1, 'Canonical URL is required').trim(),
  posterImageUrl: z.string().min(1, 'Poster image URL is required').trim(),
  lastEditedBy: z.string().min(1, 'Last edited by is required').trim(),
  seoSchema: z.string().min(1, 'SEO schema is required').trim(),

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
