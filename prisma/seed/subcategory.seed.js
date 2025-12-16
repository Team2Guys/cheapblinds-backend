import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, 'data', 'cheapblinds_data.xlsx');
const SHEET_NAME = 'subcategories';
const WRITE_BACK = false; // set true if you want categoryId written to Excel

export async function seedSubcategories() {
  console.log('🌱 Seeding subcategories...');
  console.log('📂 Excel:', FILE_PATH);

  /* ──────────────────────────────
     PHASE 1 — READ EXCEL
  ────────────────────────────── */

  const workbook = xlsx.readFile(FILE_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];

  if (!sheet) {
    throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);
  }

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

  if (!rows.length) {
    throw new Error('❌ Subcategories sheet is empty');
  }

  console.log(`📄 Rows found: ${rows.length}`);

  /* ──────────────────────────────
     PHASE 2 — LOAD CATEGORIES
  ────────────────────────────── */

  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });

  if (!categories.length) {
    throw new Error('❌ No categories found in DB');
  }

  const categoryMap = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c.id])
  );

  /* ──────────────────────────────
     PHASE 3 — VALIDATE + RESOLVE
  ────────────────────────────── */

  const resolvedRows = rows.map((row, index) => {
    const rowNum = index + 2; // Excel header offset

    if (!row.name) {
      throw new Error(`❌ Row ${rowNum}: name is required`);
    }

    if (!row.categoryName) {
      throw new Error(`❌ Row ${rowNum}: categoryName is required`);
    }

    const categoryKey = row.categoryName.trim().toLowerCase();
    const categoryId = categoryMap.get(categoryKey);

    if (!categoryId) {
      throw new Error(
        `❌ Row ${rowNum}: Category "${row.categoryName}" not found in DB`
      );
    }

    return {
      categoryId,
      categoryName: row.categoryName,
      name: row.name,
      description: row.description ?? null,
      shortDescription: row.shortDescription ?? null,
      slug:
        row.slug ??
        slugify(row.name, {
          lower: true,
          strict: true
        }),
      metaTitle: row.metaTitle ?? null,
      metaDescription: row.metaDescription ?? null,
      canonicalTag: row.canonicalTag ?? null,
      breadcrumb: row.breadcrumb ?? null,
      posterImageUrl: row.posterImageUrl ?? null,
      seoSchema: row.seoSchema ?? null,
      status: (row.status ?? 'PUBLISHED').toUpperCase(),
      lastEditedBy: row.lastEditedBy ?? 'seed-script'
    };
  });

  console.log('✅ Category names resolved → categoryId');

  /* ──────────────────────────────
     PHASE 4 — INSERT (STRICT)
  ────────────────────────────── */

  await prisma.$transaction(
    async (tx) => {
      for (const [index, row] of resolvedRows.entries()) {
        console.log(`➡️ [${index + 1}] ${row.name} → ${row.categoryName}`);

        // Enforce @@unique([slug, categoryId])
        const duplicate = await tx.subcategory.findFirst({
          where: {
            slug: row.slug,
            categoryId: row.categoryId
          }
        });

        if (duplicate) {
          throw new Error(
            `❌ Duplicate subcategory "${row.slug}" under "${row.categoryName}"`
          );
        }

        await tx.subcategory.create({
          data: {
            categoryId: row.categoryId,
            name: row.name,
            description: row.description,
            shortDescription: row.shortDescription,
            slug: row.slug,
            metaTitle: row.metaTitle,
            metaDescription: row.metaDescription,
            canonicalTag: row.canonicalTag,
            breadcrumb: row.breadcrumb,
            posterImageUrl: row.posterImageUrl,
            seoSchema: row.seoSchema,
            status: row.status,
            lastEditedBy: row.lastEditedBy
          }
        });
      }
    },
    { timeout: 300000 }
  );

  console.log('✅ Subcategories seeded successfully');

  /* ──────────────────────────────
     OPTIONAL — WRITE BACK categoryId
  ────────────────────────────── */

  if (WRITE_BACK) {
    const updatedSheet = xlsx.utils.json_to_sheet(resolvedRows);
    workbook.Sheets[SHEET_NAME] = updatedSheet;
    xlsx.writeFile(workbook, FILE_PATH);
    console.log('📝 categoryId written back to Excel');
  }
}
