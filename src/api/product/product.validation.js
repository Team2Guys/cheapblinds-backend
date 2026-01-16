import { z } from 'zod';

export const createProductSchema = z
  .object({
    categoryId: z.string().min(1, 'Category ID is required').trim(),
    subcategoryId: z.string().min(1, 'Subcategory ID is required').trim(),
    fabricId: z.number().int(),
    blindTypeId: z.number().int(),
    sku: z.string().min(1, 'SKU is required').trim(),
    name: z.string().min(1, 'Name is required').trim(),

    shortDescription: z.string().nullable().optional().trim(),
    description: z.string().nullable().optional().trim(),
    breadcrumb: z.string().nullable().optional().trim(),

    oldPath: z.string().nullable().optional().trim(),
    newPath: z.string().nullable().optional().trim(),

    posterImageUrl: z.string().url('Invalid URL').nullable().optional().trim(),
    productImages: z
      .array(z.string().trim())
      .min(1, 'At least one product image is required'),

    isMotorized: z.boolean().optional(),
    additionalInfo: z.string().nullable().optional().trim(),
    measuringGuide: z.string().nullable().optional().trim(),
    material: z.string().nullable().optional().trim(),

    minDrop: z.number().nullable().optional(),
    maxDrop: z.number().nullable().optional(),
    minWidth: z.number().nullable().optional(),
    maxWidth: z.number().nullable().optional(),

    inStock: z.number().int().nullable().optional(),

    color: z.string().nullable().optional().trim(),
    pattern: z.string().nullable().optional().trim(),

    price: z.number().positive('Price must be positive'),
    motorPrice: z.number().positive().nullable().optional(),
    discountPrice: z.number().positive().nullable().optional(),

    metaTitle: z.string().nullable().optional().trim(),
    metaDescription: z.string().nullable().optional().trim(),
    canonicalUrl: z.string().nullable().optional().trim(),
    seoSchema: z.string().nullable().optional().trim(),

    lastEditedBy: z.string().min(1, 'Last edited by is required').trim(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  })
  .strict()
  .refine((data) => !data.discountPrice || data.discountPrice <= data.price, {
    message: 'Discount price cannot exceed original price',
    path: ['discountPrice']
  });

export const updateProductSchema = createProductSchema
  .extend({
    id: z.string().min(1, 'Product ID is required').trim()
  })
  .strict();

export const getProductByPathSchema = z
  .object({
    path: z.string().min(1, 'Path is required').trim()
  })
  .strict();
