import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const subcategoryRepository = {
  read: {
    subcategories: async () => await prisma.subcategory.findMany(),

    subcategoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid subcategory ID format.");

      return await prisma.subcategory.findUnique({ where: { id } });
    },
  },

  write: {
    subcategory: async (data) => await prisma.subcategory.create({ data }),
  },

  update: {
    subcategoryById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid subcategory ID format.");
      if (Object.keys(data).length === 0) throw createError(400, "No data provided for update.");

      return await prisma.subcategory.update({ where: { id }, data });
    },
  },

  remove: {
    subcategoryById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid subcategory ID format.");

      return await prisma.subcategory.delete({ where: { id } });
    },
  },
};
