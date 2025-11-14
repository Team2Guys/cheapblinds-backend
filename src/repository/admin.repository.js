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
    admin: (data) => prisma.admin.create({ data }),
  },

  update: {
    adminById: (id, data) => prisma.admin.update({ where: { id }, data }),
  },

  remove: {
    adminById: (id) => prisma.admin.delete({ where: { id } }),
  },
};
