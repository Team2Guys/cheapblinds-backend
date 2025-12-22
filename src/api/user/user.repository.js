import { prisma } from '#lib/index.js';

export const userRepository = {
  read: {
    userList: () =>
      prisma.user.findMany({
        select: {
          id: true,
          defaultBillingAddressId: true,
          defaultShippingAddressId: true,
          firstName: true,
          lastName: true,
          email: true,
          isEmailVerified: true,
          addresses: true,
          defaultShippingAddress: true,
          defaultBillingAddress: true,
          createdAt: true,
          updatedAt: true
        }
      }),

    userById: (id) =>
      prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          defaultBillingAddressId: true,
          defaultShippingAddressId: true,
          firstName: true,
          lastName: true,
          email: true,
          isEmailVerified: true,
          addresses: true,
          defaultShippingAddress: true,
          defaultBillingAddress: true,
          createdAt: true,
          updatedAt: true
        }
      }),

    userByEmail: (email) =>
      prisma.user.findUnique({
        where: { email }
      })
  },

  write: {
    user: (data) =>
      prisma.user.create({
        data
      })
  },

  update: {
    userById: (id, data) =>
      prisma.user.update({
        where: { id },
        data,
        include: {
          addresses: true,
          defaultShippingAddress: true,
          defaultBillingAddress: true
        }
      })
  },

  remove: {
    userById: (id) =>
      prisma.user.delete({
        where: { id }
      })
  }
};
