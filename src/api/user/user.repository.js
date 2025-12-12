import { prisma } from '#lib/index.js';

export const userRepository = {
  read: {
    userList: () =>
      prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isEmailVerified: true,
          addresses: true,
          defaultBillingAddressId: true,
          defaultShippingAddressId: true,
          createdAt: true,
          updatedAt: true
        }
      }),

    userById: (id) =>
      prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isEmailVerified: true,
          addresses: true,
          defaultBillingAddressId: true,
          defaultShippingAddressId: true,
          createdAt: true,
          updatedAt: true
        }
      }),

    userByEmail: (email) =>
      prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
          role: true,
          isEmailVerified: true,
          addresses: true,
          defaultBillingAddressId: true,
          defaultShippingAddressId: true,
          createdAt: true,
          updatedAt: true
        }
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
        data
      })
  },

  remove: {
    userById: (id) =>
      prisma.user.delete({
        where: { id }
      })
  }
};
