import { orderServices } from './order.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import { createOrderSchema, updateOrderSchema } from './order.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const orderResolvers = {
  Query: {
    orderList: handlePromise(verifyAccess(() => orderServices.getOrderList())),

    orderListByUserId: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.getOrderListByUserId(id))
    ),

    orderById: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.getOrderById(id))
    )
  },

  Mutation: {
    createOrder: handlePromise(
      verifyAccess((_parent, { input }) => {
        const validated = validate(createOrderSchema, input);
        return orderServices.createOrder(validated);
      })
    ),

    updateOrderById: handlePromise(
      verifyAccess((_parent, { id, input }) => {
        const validated = validate(updateOrderSchema, { id, ...input });
        return orderServices.updateOrderById(id, validated);
      })
    ),

    removeOrderById: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.removeOrderById(id))
    )
  }
};
