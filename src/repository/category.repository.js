import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const categoryRepository = {
  read: {
    categories: async () => await prisma.category.findMany(),

    categoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid category ID format.");

      return await prisma.category.findUnique({
        where: { id },
      });
    },
  },

  write: {
    category: async (data) =>
      await prisma.category.create({
        data,
      }),
  },

  update: {
    categoryById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid category ID format.");
      if (Object.keys(data).length === 0) throw createError(400, "No data provided for update.");

      return await prisma.category.update({
        where: { id },
        data,
      });
    },
  },

  remove: {
    categoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid category ID format.");

      return await prisma.category.delete({
        where: { id },
      });
    },
  },
};
