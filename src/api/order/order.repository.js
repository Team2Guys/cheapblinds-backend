import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const orderRepository = {
  read: {
    orderList: () => prisma.order.findMany(),

    orderListByUserId: (id) =>
      prisma.order.findMany({
        where: { userId: id }
      }),

    orderById: (id) =>
      prisma.order.findUnique({
        where: { id }
      })
  },

  write: {
    order: (data) =>
      prisma.order.create({
        data
      })
  },

  update: {
    orderById: (id, data) =>
      prisma.order.update({
        where: { id },
        data
      })
  },

  remove: {
    orderById: (id) =>
      prisma.order.delete({
        where: { id }
      })
  }
};
