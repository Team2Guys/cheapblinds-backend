import { prisma } from '#lib/index.js';

export const subcategoryRepository = {
  read: {
    subcategoryList: () =>
      prisma.subcategory.findMany({
        include: {
          category: true,
          products: true
        }
      }),

    subcategoryById: (id) =>
      prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: true,
          products: true
        }
      }),

    subcategoryByPath: ({ path }) =>
      prisma.subcategory.findFirst({
        where: {
          newPath: path
        },
        include: {
          category: true,
          products: true
        }
      })
  },

  write: {
    subcategory: (data) => prisma.subcategory.create({ data })
  },

  update: {
    subcategoryById: (id, data) =>
      prisma.subcategory.update({ where: { id }, data })
  },

  remove: {
    subcategoryById: (id) => prisma.subcategory.delete({ where: { id } })
  }
};
