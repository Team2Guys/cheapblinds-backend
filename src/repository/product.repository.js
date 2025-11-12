import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { commonUtils } from "#utils/index.js";

const prisma = new PrismaClient();
const { validateUuid } = commonUtils;

export const productRepository = {
  read: {
    products: async () => await prisma.product.findMany(),

    productById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid product ID format.");

      return await prisma.product.findUnique({
        where: { id },
      });
    },
  },

  write: {
    product: async (data) =>
      await prisma.product.create({
        data,
      }),
  },

  update: {
    productById: async ({ id, ...data }) => {
      if (!validateUuid(id)) throw createError(400, "Invalid product ID format.");
      if (Object.keys(data).length === 0) throw createError(400, "No data provided for update.");

      return await prisma.product.update({
        where: { id },
        data,
      });
    },
  },

  remove: {
    productById: async (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid product ID format.");

      return await prisma.product.delete({
        where: { id },
      });
    },
  },
};
