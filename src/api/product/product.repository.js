import { prisma } from '#lib/index.js';

export const productRepository = {
  read: {
    productList: () =>
      prisma.product.findMany({
        include: {
          category: true,
          subcategory: true
        }
      }),

    productById: (id) =>
      prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true
        }
      }),

    productByPaths: ({ categoryPath, subcategoryPath, productPath }) =>
      prisma.product.findFirst({
        where: {
          newPath: productPath,
          subcategory: {
            newPath: subcategoryPath,
            category: {
              newPath: categoryPath
            }
          }
        },
        include: {
          category: true,
          subcategory: true
        }
      })
  },

  write: {
    product: (data) =>
      prisma.product.create({
        data
      })
  },

  update: {
    productById: (id, data) =>
      prisma.product.update({
        where: { id },
        data
      })
  },

  remove: {
    productById: (id) =>
      prisma.product.delete({
        where: { id }
      })
  }
};
