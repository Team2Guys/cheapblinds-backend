import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const subcategoryRepository = {
  read: {
    subcategories: () =>
      prisma.subcategory.findMany({
        include: {
          category: true,
          products: true,
        },
      }),

    subcategoryById: (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");

      return prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: true,
          products: true,
        },
      });
    },
  },

  write: {
    subcategory: (data) => prisma.subcategory.create({ data }),
  },

  update: {
    subcategoryById: (id, data) => prisma.subcategory.update({ where: { id }, data }),
  },

  remove: {
    subcategoryById: (id) => prisma.subcategory.delete({ where: { id } }),
  },
};
