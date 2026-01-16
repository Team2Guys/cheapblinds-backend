import { z } from 'zod';

export const createProductSchema = z
  .object({
    categoryId: z.string().trim().min(1, 'Category ID is required'),
    subcategoryId: z.string().trim().min(1, 'Subcategory ID is required'),
    fabricId: z.number().int(),
    blindTypeId: z.number().int(),
    sku: z.string().trim().min(1, 'SKU is required'),
    name: z.string().trim().min(1, 'Name is required'),

    shortDescription: z.string().trim().nullable().optional(),
    description: z.string().trim().nullable().optional(),
    breadcrumb: z.string().trim().nullable().optional(),

    oldPath: z.string().trim().nullable().optional(),
    newPath: z.string().trim().nullable().optional(),

    posterImageUrl: z.url('Invalid URL').trim().nullable().optional(),
    productImages: z
      .array(z.string().trim())
      .min(1, 'At least one product image is required'),

    isMotorized: z.boolean().optional(),
    additionalInfo: z.string().trim().nullable().optional(),
    measuringGuide: z.string().trim().nullable().optional(),
    material: z.string().trim().nullable().optional(),

    minDrop: z.number().nullable().optional(),
    maxDrop: z.number().nullable().optional(),
    minWidth: z.number().nullable().optional(),
    maxWidth: z.number().nullable().optional(),

    inStock: z.number().int().nullable().optional(),

    color: z.string().trim().nullable().optional(),
    pattern: z.string().trim().nullable().optional(),

    price: z.number().positive('Price must be positive'),
    motorPrice: z.number().positive().nullable().optional(),
    discountPrice: z.number().positive().nullable().optional(),

    metaTitle: z.string().trim().nullable().optional(),
    metaDescription: z.string().trim().nullable().optional(),
    canonicalUrl: z.string().trim().nullable().optional(),
    seoSchema: z.string().trim().nullable().optional(),

    lastEditedBy: z.string().trim().min(1, 'Last edited by is required'),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  })
  .strict()
  .refine((data) => !data.discountPrice || data.discountPrice <= data.price, {
    message: 'Discount price cannot exceed original price',
    path: ['discountPrice']
  });

export const updateProductSchema = createProductSchema
  .extend({
    id: z.string().trim().min(1, 'Product ID is required')
  })
  .strict();

export const getProductByPathSchema = z
  .object({
    path: z.string().trim().min(1, 'Path is required')
  })
  .strict();
