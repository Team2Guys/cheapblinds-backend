import { orderServices } from "./order.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess } = verifications;

export const orderResolvers = {
  Query: {
    getOrderList: handlePromise(verifyAccess(() => orderServices.getOrderList())),

    getOrderListByUserId: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.getOrderListByUserId(id)),
    ),

    getOrderById: handlePromise(verifyAccess((_parent, { id }) => orderServices.getOrderById(id))),
  },

  Mutation: {
    createOrder: handlePromise(
      verifyAccess((_parent, { input }) => orderServices.createOrder(input)),
    ),

    updateOrderById: handlePromise(
      verifyAccess((_parent, { id, input }) => orderServices.updateOrderById(id, input)),
    ),

    removeOrderById: handlePromise(
      verifyAccess((_parent, { id }) => orderServices.removeOrderById(id)),
    ),
  },
};
