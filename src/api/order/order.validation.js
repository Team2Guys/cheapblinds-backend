import { z } from 'zod';

const addressObj = z.object({}).passthrough();

export const createOrderSchema = z
  .object({
    userId: z.string().trim().min(1, 'User ID is required'),
    shippingAddress: addressObj,
    billingAddress: addressObj,
    totalAmount: z.number().nonnegative('Total amount must be positive'),
    shippingCost: z.number().nonnegative('Shipping cost must be positive'),
    notes: z.string().trim().nullable().optional(),
    orderItems: z
      .array(z.object({}).passthrough())
      .min(1, 'At least one order item is required'),
    paymentStatus: z.enum(['FREE', 'PENDING', 'PAID', 'CANCELED', 'FAILED']),
    orderStatus: z.enum([
      'PENDING',
      'PAID',
      'CANCELED',
      'FAILED',
      'SHIPPED',
      'COMPLETED'
    ]),
    lastEditedBy: z.string().trim().min(1, 'Last edited by is required')
  })
  .strict();

export const updateOrderSchema = createOrderSchema
  .partial()
  .extend({
    id: z.string().trim().min(1, 'Order ID is required')
  })
  .strict();
