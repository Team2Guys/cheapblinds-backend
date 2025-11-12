import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const subCategoryRepository = {
  read: {
    subCategories: async () => await prisma.subCategory.findMany(),

    subCategoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid sub-category ID format.");

      return await prisma.subCategory.findUnique({ where: { id } });
    },
  },

  write: {
    subCategory: async (data) => await prisma.subCategory.create({ data }),
  },

  update: {
    subCategoryById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid sub-category ID format.");
      if (Object.keys(data).length === 0) throw createError(400, "No data provided for update.");

      return await prisma.subCategory.update({ where: { id }, data });
    },
  },

  remove: {
    subCategoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid sub-category ID format.");

      return await prisma.subCategory.delete({ where: { id } });
    },
  },
};
