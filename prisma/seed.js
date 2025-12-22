// main.js
import { prisma } from '#lib/index.js';
import {
  seedCategories,
  seedProducts,
  seedSubcategories
} from './seed/index.js';

async function main() {
  console.log('🚀 Prisma seed started');

  console.time('Total seed time');

  console.time('Seeding categories');
  await seedCategories();
  console.timeEnd('Seeding categories');

  console.time('Seeding subcategories');
  await seedSubcategories();
  console.timeEnd('Seeding subcategories');

  console.time('Seeding products');
  await seedProducts();
  console.timeEnd('Seeding products');

  console.timeEnd('Total seed time');
  console.log('🏁 Prisma seed finished');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
