import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const categoryRepository = {
  read: {
    categories: () =>
      prisma.category.findMany({
        include: {
          subcategories: true,
          products: true,
        },
      }),

    categoryById: (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid category id.");

      return prisma.category.findUnique({
        where: { id },
        include: {
          subcategories: true,
          products: true,
        },
      });
    },

    categoryByCustomUrl: (customUrl) =>
      prisma.category.findUnique({
        where: { customUrl },
        include: {
          subcategories: {
            include: {
              products: true,
            },
          },
        },
      }),
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
