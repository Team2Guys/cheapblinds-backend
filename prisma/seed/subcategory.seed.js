// seedSubcategories.js
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, 'data', 'cheapblinds_data.xlsx');
const SHEET_NAME = 'subcategories';
const WRITE_BACK = false;

export async function seedSubcategories() {
  console.log('🌱 Seeding subcategories...');
  console.log('📂 Excel path:', FILE_PATH);

  const workbook = xlsx.readFile(FILE_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
  console.log(`📄 Rows found: ${rows.length}`);
  if (!rows.length) throw new Error('❌ Subcategories sheet is empty');

  // Fetch categories and build a lookup map
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });
  if (!categories.length) throw new Error('❌ No categories found in DB');

  const categoryMap = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c.id])
  );

  const resolvedRows = rows.map((row, index) => {
    const rowNum = index + 2;
    if (!row.name) throw new Error(`❌ Row ${rowNum}: name is required`);
    if (!row.categoryName)
      throw new Error(`❌ Row ${rowNum}: categoryName is required`);

    const categoryId = categoryMap.get(row.categoryName.trim().toLowerCase());
    if (!categoryId)
      throw new Error(
        `❌ Row ${rowNum}: Category "${row.categoryName}" not found in DB`
      );

    return {
      categoryId,
      name: row.name,
      shortDescription: row.shortDescription || '',
      description: row.description || '',
      breadcrumb: row.breadcrumb || '',
      oldPath: row.oldPath || '',
      newPath: row.newPath || '',
      posterImageUrl: row.posterImageUrl || '',
      metaTitle: row.metaTitle || row.name,
      metaDescription: row.metaDescription || '',
      canonicalUrl: row.canonicalUrl || '',
      seoSchema: row.seoSchema || '',
      lastEditedBy: row.lastEditedBy || 'seed-script',
      status: (row.status || 'PUBLISHED').toUpperCase()
    };
  });

  console.log('✅ Category names resolved → categoryId');

  // Upsert each subcategory
  for (const [index, row] of resolvedRows.entries()) {
    console.log(`➡️ [${index + 1}] ${row.name} → categoryId ${row.categoryId}`);

    await prisma.subcategory.upsert({
      where: {
        categoryId_newPath: {
          newPath: row.newPath,
          categoryId: row.categoryId
        }
      },
      update: { ...row },
      create: { ...row }
    });
  }

  console.log('✅ Subcategories seeded successfully');

  if (WRITE_BACK) {
    const updatedSheet = xlsx.utils.json_to_sheet(resolvedRows);
    workbook.Sheets[SHEET_NAME] = updatedSheet;
    xlsx.writeFile(workbook, FILE_PATH);
    console.log('📝 categoryId written back to Excel');
  }
}
