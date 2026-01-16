import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string().min(1),
  shippingAddress: z.object({}).passthrough(),
  billingAddress: z.object({}).passthrough(),
  totalAmount: z.number().positive(),
  shippingCost: z.number().positive(),
  notes: z.string().nullable().optional(),
  orderItems: z.array(z.object({}).passthrough()).min(1),
  paymentStatus: z.enum(['FREE', 'PENDING', 'PAID', 'CANCELED', 'FAILED']),
  orderStatus: z.enum([
    'PENDING',
    'PAID',
    'CANCELED',
    'FAILED',
    'SHIPPED',
    'COMPLETED'
  ]),
  lastEditedBy: z.string().min(1)
});

export const updateOrderSchema = z.object({
  id: z.string().min(1),
  userId: z.string().optional(),
  shippingAddress: z.object({}).passthrough().optional(),
  billingAddress: z.object({}).passthrough().optional(),
  totalAmount: z.number().positive().optional(),
  shippingCost: z.number().positive().optional(),
  notes: z.string().nullable().optional(),
  orderItems: z.array(z.object({}).passthrough()).optional(),
  paymentStatus: z
    .enum(['FREE', 'PENDING', 'PAID', 'CANCELED', 'FAILED'])
    .optional(),
  orderStatus: z
    .enum(['PENDING', 'PAID', 'CANCELED', 'FAILED', 'SHIPPED', 'COMPLETED'])
    .optional(),
  lastEditedBy: z.string().optional()
});
