import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const orderServices = {
  createOrder: (input) => write.order(input),

  getOrderList: () => read.orderList(),

  getOrderListByUserId: async (id) => {
    await ensureResourceExists("user", id);
    return read.orderListByUserId(id);
  },

  getOrderById: async (id) => {
    await ensureResourceExists("order", id);
    return read.orderById(id);
  },

  updateOrderById: async (id, input) => {
    await ensureResourceExists("order", id);
    return update.orderById(id, input);
  },

  removeOrderById: async (id) => {
    await ensureResourceExists("order", id);
    return remove.orderById(id);
  },
};
