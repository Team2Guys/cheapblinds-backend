import { z } from 'zod';

export const createProductSchema = z.object({
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  fabricId: z.number().int(),
  blindTypeId: z.number().int(),
  sku: z.string().min(1),
  name: z.string().min(1),

  shortDescription: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  breadcrumb: z.string().nullable().optional(),

  oldPath: z.string().nullable().optional(),
  newPath: z.string().nullable().optional(),

  posterImageUrl: z.string().url().nullable().optional(),
  productImages: z.array(z.string()).min(1),

  isMotorized: z.boolean().optional(),
  additionalInfo: z.string().nullable().optional(),
  measuringGuide: z.string().nullable().optional(),
  material: z.string().nullable().optional(),

  minDrop: z.number().nullable().optional(),
  maxDrop: z.number().nullable().optional(),
  minWidth: z.number().nullable().optional(),
  maxWidth: z.number().nullable().optional(),

  inStock: z.number().int().nullable().optional(),

  color: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),

  price: z.number().positive(),
  motorPrice: z.number().positive().nullable().optional(),
  discountPrice: z.number().positive().nullable().optional(),

  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),
  seoSchema: z.string().nullable().optional(),

  lastEditedBy: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
});

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1)
});

export const getProductByPathSchema = z.object({
  path: z.string().min(1)
});
