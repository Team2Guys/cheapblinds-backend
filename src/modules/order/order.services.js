import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const orderServices = {
  createOrder: async (input) => write.order(input),
  getOrderList: () => read.orders(),

  getOrderById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.orderById(id);
  },

  updateOrderById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingOrder = await read.orderById(id);
    if (!existingOrder) throw createError(404, "Order does not exist.");

    return update.orderById(id, input);
  },

  removeOrderById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingOrder = await read.orderById(id);
    if (!existingOrder) throw createError(404, "Order does not exist.");

    return remove.orderById(id);
  },
};
