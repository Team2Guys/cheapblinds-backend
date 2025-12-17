import { orderServices } from './order.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

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
      verifyAccess((_parent, { input }) => orderServices.createOrder(input))
    ),

    updateOrderById: handlePromise(
      verifyAccess((_parent, { id, input }) =>
        orderServices.updateOrderById(id, input)
      )
    ),

    removeOrderById: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.removeOrderById(id))
    )
  }
};
