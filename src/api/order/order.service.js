import { orderRepository } from './order.repository.js';

const { write, read, update, remove } = orderRepository;

export const orderServices = {
  createOrder: (input) => write.order(input),

  getOrderList: () => read.orderList(),

  getOrderListByUserId: (id) => read.orderListByUserId(id),

  getOrderById: (id) => read.orderById(id),

  updateOrderById: (id, input) => update.orderById(id, input),

  removeOrderById: (id) => remove.orderById(id)
};
