import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const categoryRepository = {
  read: {
    categories: () => prisma.category.findMany(),

    categoryById: (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid category id.");

      return prisma.category.findUnique({
        where: { id },
      });
    },
  },

  write: {
    category: (data) =>
      prisma.category.create({
        data,
      }),
  },

  update: {
    categoryById: (id, data) =>
      prisma.category.update({
        where: { id },
        data,
      }),
  },

  remove: {
    categoryById: (id) =>
      prisma.category.delete({
        where: { id },
      }),
  },
};
