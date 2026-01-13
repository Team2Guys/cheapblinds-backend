import { orderRepository } from './order.repository.js';
import { cache } from '#lib/index.js';

const { write, read, update, remove } = orderRepository;
const CACHE_TTL = 120;

export const orderServices = {
  createOrder: async (input, userId) => {
    const order = await write.order(input);
    // Invalidate caches
    await cache.del('orders:list');
    await cache.del(`orders:user:${userId}`);
    return order;
  },

  getOrderList: async () => {
    const key = 'orders:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const orders = await read.orderList();
    if (orders.length) await cache.set(key, orders, CACHE_TTL);
    return orders;
  },

  getOrderListByUserId: async (userId) => {
    const key = `orders:user:${userId}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const orders = await read.orderListByUserId(userId);
    if (orders.length) await cache.set(key, orders, CACHE_TTL);
    return orders;
  },

  getOrderById: async (id) => {
    const key = `orders:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const order = await read.orderById(id);
    if (order) await cache.set(key, order, CACHE_TTL);
    return order;
  },

  updateOrderById: async (id, input, userId) => {
    const order = await update.orderById(id, input);

    await cache.del(`orders:id:${id}`);
    await cache.del('orders:list');
    await cache.del(`orders:user:${userId}`);
    return order;
  },

  removeOrderById: async (id, userId) => {
    const order = await remove.orderById(id);

    await cache.del(`orders:id:${id}`);
    await cache.del('orders:list');
    await cache.del(`orders:user:${userId}`);
    return order;
  }
};
