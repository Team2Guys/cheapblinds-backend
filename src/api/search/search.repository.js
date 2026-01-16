import { prisma } from '#lib/index.js';

export const searchRepository = {
  searchCategories: (q, limit = 5) =>
    prisma.category.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [{ name: { contains: q, mode: 'insensitive' } }]
      },
      take: limit
    }),

  searchSubcategories: (q, limit = 5) =>
    prisma.subcategory.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [{ name: { contains: q, mode: 'insensitive' } }]
      },
      include: { category: true },
      take: limit
    }),

  searchProducts: (q, limit = 10) =>
    prisma.product.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [{ name: { contains: q, mode: 'insensitive' } }]
      },
      include: {
        category: true,
        subcategory: true
      },
      take: limit
    })
};
