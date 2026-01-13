// seedProducts.js
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.join(__dirname, 'data', 'cheapblinds_data.xlsx');
const SHEET_NAME = 'products';

export async function seedProducts() {
  console.log('🌱 Seeding products...');
  console.log('📂 Excel path:', EXCEL_PATH);

  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
  console.log(`📄 Rows found: ${rows.length}`);
  if (!rows.length) throw new Error('❌ Products sheet is empty');

  // Fetch categories and subcategories
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });
  const subcategories = await prisma.subcategory.findMany({
    select: { id: true, name: true, categoryId: true }
  });

  const categoryMap = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c.id])
  );
  const subcategoryMap = new Map(
    subcategories.map((sc) => [
      `${sc.name.trim().toLowerCase()}__${sc.categoryId}`,
      sc.id
    ])
  );

  // Resolve categoryId and subcategoryId for each row
  const resolvedRows = rows.map((row, index) => {
    const rowNum = index + 2;

    if (!row.categoryName || !row.subcategoryName) {
      throw new Error(
        `❌ Row ${rowNum}: categoryName or subcategoryName missing`
      );
    }

    const categoryId = categoryMap.get(row.categoryName.trim().toLowerCase());
    if (!categoryId)
      throw new Error(
        `❌ Row ${rowNum}: Category "${row.categoryName}" not found`
      );

    const subcategoryKey = `${row.subcategoryName.trim().toLowerCase()}__${categoryId}`;
    const subcategoryId = subcategoryMap.get(subcategoryKey);
    if (!subcategoryId)
      throw new Error(
        `❌ Row ${rowNum}: Subcategory "${row.subcategoryName}" not found under category "${row.categoryName}"`
      );

    return {
      rowNum,
      categoryId,
      subcategoryId,
      fabricId: row.fabricId || null,
      blindTypeId: row.blindTypeId || null,
      sku: row.sku || '',
      name: row.name,
      shortDescription: row.shortDescription || '',
      description: row.description || '',
      breadcrumb: row.breadcrumb || '',
      oldPath: row.oldPath || '',
      newPath: row.newPath || '',
      posterImageUrl: row.posterImageUrl || '',
      productImages: parsePgArray(row.productImages, rowNum, 'productImages'),
      isMotorized: row.isMotorized === true || row.isMotorized === 'TRUE',
      additionalInfo: row.additionalInfo || '',
      measuringGuide: row.measuringGuide || '',
      material: row.composition || '',
      minDrop: Number(row.minDrop || 0),
      maxDrop: Number(row.maxDrop || 0),
      minWidth: Number(row.minWidth || 0),
      maxWidth: Number(row.maxWidth || 0),
      inStock: row.inStock === 'TRUE' ? true : false,
      color: row.color || '',
      pattern: row.pattern || '',
      price: Number(row.price || 0),
      motorPrice: Number(row.motorPrice || 0),
      discountPrice: Number(row.discountPrice || 0),
      metaTitle: row.metaTitle || row.name,
      metaDescription: row.metaDescription || '',
      canonicalUrl: row.canonicalUrl || '',
      seoSchema: row.seoSchema || '',
      lastEditedBy: row.lastEditedBy || 'seed-script',
      status: (row.status || 'PUBLISHED').toUpperCase()
    };
  });

  console.log('✅ Category & subcategory IDs resolved');

  // Upsert each product
  for (const row of resolvedRows) {
    try {
      await prisma.product.upsert({
        where: {
          subcategoryId_newPath: {
            subcategoryId: row.subcategoryId,
            newPath: row.newPath
          }
        },
        update: { ...row, rowNum: undefined },
        create: { ...row, rowNum: undefined }
      });

      console.log(`➡️ [Row ${row.rowNum}] ${row.name} upserted successfully`);
    } catch (err) {
      throw new Error(
        `❌ Product upsert failed at row ${row.rowNum}: ${err.message}`
      );
    }
  }

  console.log('✅ Products seeded successfully');
}

// Helper to parse Postgres array string
export function parsePgArray(value, rowNum, fieldName) {
  if (Array.isArray(value)) return value;
  if (!value || value === '{}' || value === '[]') return [];

  if (typeof value !== 'string')
    throw new Error(`❌ Row ${rowNum}: ${fieldName} must be a string or array`);

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((v) => v.trim().replace(/^"(.*)"$/, '$1'))
      .filter(Boolean);
  }

  throw new Error(`❌ Row ${rowNum}: ${fieldName} is not a valid array format`);
}
