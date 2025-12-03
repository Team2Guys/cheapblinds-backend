import { orderServices } from "./order.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const orderResolvers = {
  Query: {
    getOrderList: handleAsync(verifyAccess(async () => orderServices.getOrderList())),

    getOrderById: handleAsync(
      verifyAccess(async (_parent, { id }) => orderServices.getOrderById(id)),
    ),
  },

  Mutation: {
    createOrder: handleAsync(
      verifyAccess(async (_parent, { input }) => orderServices.createOrder(input)),
    ),

    updateOrderById: handleAsync(
      verifyAccess(async (_parent, { id, input }) => orderServices.updateOrderById(id, input)),
    ),

    removeOrderById: handleAsync(
      verifyAccess(async (_parent, { id }) => orderServices.removeOrderById(id)),
    ),
  },
};
