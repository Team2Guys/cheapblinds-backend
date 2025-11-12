import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const adminRepository = {
  read: {
    admins: async () =>
      prisma.admin.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

    adminById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
      return prisma.admin.findUnique({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },

    adminByEmail: async (email) =>
      prisma.admin.findUnique({
        where: { email },
      }),
  },

  write: {
    admin: async (data) =>
      await prisma.admin.create({
        data,
      }),
  },

  update: {
    adminById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
      if (!Object.keys(data).length) throw createError(400, "No data provided for update");

      return await prisma.admin.update({
        where: { id },
        data,
      });
    },
  },

  remove: {
    adminById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");

      return await prisma.admin.delete({
        where: { id },
      });
    },
  },
};
