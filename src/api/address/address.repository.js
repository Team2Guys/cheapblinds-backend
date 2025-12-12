import { prisma } from '#lib/index.js';

export const addressRepository = {
  read: {
    addressListByUserId: (userId) =>
      prisma.address.findMany({
        where: { userId }
      }),

    addressById: (id) =>
      prisma.address.findUnique({
        where: { id }
      })
  },

  write: {
    address: (data) =>
      prisma.address.create({
        data
      })
  },

  update: {
    addressById: (id, data) =>
      prisma.address.update({
        where: { id },
        data
      })
  },

  remove: {
    addressById: (id) =>
      prisma.address.delete({
        where: { id }
      })
  }
};
