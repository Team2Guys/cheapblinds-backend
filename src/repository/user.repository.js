import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const userRepository = {
  read: {
    users: async () =>
      prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

    userById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid user ID format.");
      return prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },

    userByEmail: async (email) =>
      prisma.user.findUnique({
        where: { email },
      }),
  },

  write: {
    user: async (data) =>
      await prisma.user.create({
        data,
      }),
  },

  update: {
    userById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid user ID format.");
      if (!Object.keys(data).length) throw createError(400, "No data provided for update");

      return await prisma.user.update({
        where: { id },
        data,
      });
    },
  },

  remove: {
    userById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid user ID format.");

      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};
