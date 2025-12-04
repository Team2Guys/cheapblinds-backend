import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const orderServices = {
  createOrder: (input) => write.order(input),

  getOrderList: () => read.orderList(),

  getOrderById: (id) => {
    validateUuid(id);
    return read.orderById(id);
  },

  updateOrderById: async (id, input) => {
    validateUuid(id);

    const existingOrder = await read.orderById(id);
    if (!existingOrder) throw createError(404, "Order does not exist.");

    return update.orderById(id, input);
  },

  removeOrderById: async (id) => {
    validateUuid(id);

    const existingOrder = await read.orderById(id);
    if (!existingOrder) throw createError(404, "Order does not exist.");

    return remove.orderById(id);
  },
};
