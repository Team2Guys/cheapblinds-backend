// seedCategories.js
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, 'data', 'cheapblinds_data.xlsx');
const SHEET_NAME = 'categories';

export async function seedCategories() {
  console.log('🌱 Seeding categories...');
  console.log('📂 Excel path:', FILE_PATH);

  const workbook = xlsx.readFile(FILE_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];

  if (!sheet) throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
  console.log(`📄 Rows found: ${rows.length}`);
  if (!rows.length)
    throw new Error('❌ Excel file loaded but contains ZERO rows');

  for (const [index, row] of rows.entries()) {
    if (!row.name) throw new Error(`❌ Row ${index + 1}: name is required`);

    const slug = slugify(row.name, { lower: true, strict: true });
    console.log(`➡️ [${index + 1}] ${row.name}`);

    await prisma.category.upsert({
      where: { slug },
      update: {
        name: row.name,
        description: row.description ?? '',
        shortDescription: row.shortDescription ?? '',
        metaTitle: row.metaTitle ?? row.name,
        metaDescription: row.metaDescription ?? '',
        canonicalTag: row.canonicalTag ?? '',
        breadcrumb: row.breadcrumb ?? '',
        posterImageUrl: row.posterImageUrl ?? '',
        seoSchema: row.seoSchema ?? '',
        status: (row.status ?? 'PUBLISHED').toUpperCase(),
        lastEditedBy: row.lastEditedBy ?? 'seed-script'
      },
      create: {
        name: row.name,
        description: row.description ?? '',
        shortDescription: row.shortDescription ?? '',
        slug,
        metaTitle: row.metaTitle ?? row.name,
        metaDescription: row.metaDescription ?? '',
        canonicalTag: row.canonicalTag ?? '',
        breadcrumb: row.breadcrumb ?? '',
        posterImageUrl: row.posterImageUrl ?? '',
        seoSchema: row.seoSchema ?? '',
        status: (row.status ?? 'PUBLISHED').toUpperCase(),
        lastEditedBy: row.lastEditedBy ?? 'seed-script'
      }
    });
  }

  console.log('✅ Categories seeded successfully');
}
