import { prisma } from '#lib/index.js';

export const productRepository = {
  read: {
    productList: () => prisma.product.findMany(),

    productById: (id) =>
      prisma.product.findUnique({
        where: { id }
      }),

    productBySlugs: ({ categorySlug, subcategorySlug, productSlug }) =>
      prisma.product.findFirst({
        where: {
          slug: productSlug,
          subcategory: {
            slug: subcategorySlug,
            category: {
              slug: categorySlug
            }
          }
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
