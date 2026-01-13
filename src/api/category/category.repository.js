import { prisma } from '#lib/index.js';

export const categoryRepository = {
  read: {
    categoryList: () =>
      prisma.category.findMany({
        include: {
          subcategories: true,
          products: true
        }
      }),

    categoryById: (id) =>
      prisma.category.findUnique({
        where: { id },
        include: {
          subcategories: true,
          products: true
        }
      }),

    categoryByPath: ({ path }) =>
      prisma.category.findUnique({
        where: { newPath: path },
        include: {
          subcategories: {
            include: {
              products: true
            }
          }
        }
      })
  },

  write: {
    category: (data) =>
      prisma.category.create({
        data
      })
  },

  update: {
    categoryById: (id, data) =>
      prisma.category.update({
        where: { id },
        data
      })
  },

  remove: {
    categoryById: (id) =>
      prisma.category.delete({
        where: { id }
      })
  }
};
