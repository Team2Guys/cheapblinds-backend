import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const adminRepository = {
  read: {
    admins: () => prisma.admin.findMany(),

    adminById: (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
      return prisma.admin.findUnique({ where: { id } });
    },

    adminByEmail: (email) => prisma.admin.findUnique({ where: { email } }),
  },

  write: {
    admin: async (data) => prisma.admin.create({ data }),
  },

  update: {
    adminById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
      return prisma.admin.update({ where: { id }, data });
    },
  },

  remove: {
    adminById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
      return prisma.admin.delete({ where: { id } });
    },
  },
};
