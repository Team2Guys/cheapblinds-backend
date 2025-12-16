import { prisma } from '#lib/index.js';
import { seedCategories, seedSubcategories } from './seed/index.js';

async function main() {
  console.log('🚀 Prisma seed started');

  await seedCategories();
  await seedSubcategories();

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
