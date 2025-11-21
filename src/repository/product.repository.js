import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { commonUtils } from "#utils/index.js";

const prisma = new PrismaClient();
const { validateUuid } = commonUtils;

export const productRepository = {
  read: {
    products: () =>
      prisma.product.findMany({
        include: {
          category: true,
          subcategory: true,
        },
      }),

    productById: (id) => {
      if (!validateUuid(id)) throw createError(400, "Invalid product id.");

      return prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true,
        },
      });
    },

    productByUrls: (categoryCustomUrl, subcategoryCustomUrl, productCustomUrl) => {
      return prisma.product.findFirst({
        where: {
          customUrl: productCustomUrl,
          subcategory: {
            customUrl: subcategoryCustomUrl,
            category: {
              customUrl: categoryCustomUrl,
            },
          },
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
    },
  },

  write: {
    product: (data) =>
      prisma.product.create({
        data,
      }),
  },

  update: {
    productById: (id, data) =>
      prisma.product.update({
        where: { id },
        data,
      }),
  },

  remove: {
    productById: (id) =>
      prisma.product.delete({
        where: { id },
      }),
  },
};
