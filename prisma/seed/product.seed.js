import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.join(__dirname, 'data', 'cheapblinds_data.xlsx');
const SHEET_NAME = 'products';
const WRITE_BACK_TO_EXCEL = true; // <- toggle

export async function seedProducts() {
  console.log('🚀 Seeding products...');

  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];

  if (!sheet) {
    throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);
  }

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

  if (!rows.length) {
    throw new Error('❌ Products sheet is empty');
  }

  /** --------------------------------------------
   * PHASE 1: Load reference data
   * ------------------------------------------- */
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });

  const subcategories = await prisma.subcategory.findMany({
    select: { id: true, name: true, categoryId: true }
  });

  const categoryMap = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c])
  );

  const subcategoryMap = new Map(
    subcategories.map((sc) => [
      `${sc.name.trim().toLowerCase()}__${sc.categoryId}`,
      sc
    ])
  );

  /** --------------------------------------------
   * PHASE 2: Resolve categoryId & subcategoryId
   * ------------------------------------------- */
  for (const [index, row] of rows.entries()) {
    const rowNum = index + 2;

    if (!row.categoryName || !row.subcategoryName) {
      throw new Error(
        `❌ Row ${rowNum}: categoryName or subcategoryName missing`
      );
    }

    const category = categoryMap.get(row.categoryName.trim().toLowerCase());

    if (!category) {
      throw new Error(
        `❌ Row ${rowNum}: Category "${row.categoryName}" not found`
      );
    }

    const subcategoryKey = `${row.subcategoryName.trim().toLowerCase()}__${category.id}`;

    const subcategory = subcategoryMap.get(subcategoryKey);

    if (!subcategory) {
      throw new Error(
        `❌ Row ${rowNum}: Subcategory "${row.subcategoryName}" not found under category "${row.categoryName}"`
      );
    }

    row.categoryId = category.id;
    row.subcategoryId = subcategory.id;
  }

  /** --------------------------------------------
   * OPTIONAL: Write IDs back to Excel
   * ------------------------------------------- */
  if (WRITE_BACK_TO_EXCEL) {
    const updatedSheet = xlsx.utils.json_to_sheet(rows);
    workbook.Sheets[SHEET_NAME] = updatedSheet;
    xlsx.writeFile(workbook, EXCEL_PATH);
    console.log('📝 categoryId & subcategoryId written back to Excel');
  }

  /** --------------------------------------------
   * PHASE 3: Insert products
   * ------------------------------------------- */
  await prisma.$transaction(async (tx) => {
    for (const [index, row] of rows.entries()) {
      try {
        await tx.product.create({
          data: {
            name: row.name,
            slug: row.slug || slugify(row.name, { lower: true }),
            breadcrumb: row.breadcrumb,
            description: row.description,
            shortDescription: row.shortDescription,
            categoryId: row.categoryId,
            subcategoryId: row.subcategoryId,
            posterImageUrl: row.posterImageUrl,
            productImages: parsePgArray(
              row.productImages,
              index + 2,
              'productImages'
            ),
            price: Number(row.price),
            discountPrice: row.discountPrice ? Number(row.discountPrice) : null,
            isMotorized: row.isMotorized === true || row.isMotorized === 'TRUE',
            motorPrice: Number(row.motorPrice || 0),
            stock: Number(row.stock),
            width: Number(row.width),
            height: Number(row.height),
            pattern: row.pattern,
            composition: row.composition,
            color: row.color,
            additionalInfo: row.additionalInfo,
            measuringGuide: row.measuringGuide,
            metaTitle: row.metaTitle,
            metaDescription: row.metaDescription,
            canonicalTag: row.canonicalTag,
            seoSchema: row.seoSchema,
            status: row.status,
            lastEditedBy: row.lastEditedBy || 'seed-script'
          }
        });
      } catch (err) {
        throw new Error(
          `❌ Product insert failed at row ${index + 2}: ${err.message}`
        );
      }
    }
  });

  console.log('✅ Products seeded successfully');
}

export function parsePgArray(value, rowNum, fieldName) {
  if (Array.isArray(value)) return value;

  if (typeof value !== 'string') {
    throw new Error(`❌ Row ${rowNum}: ${fieldName} must be a string or array`);
  }

  // Remove wrapping braces { ... }
  const trimmed = value.trim();

  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    throw new Error(
      `❌ Row ${rowNum}: ${fieldName} is not a valid array format`
    );
  }

  try {
    return trimmed
      .slice(1, -1) // remove { }
      .split(',')
      .map(
        (v) => v.trim().replace(/^"(.*)"$/, '$1') // remove quotes
      )
      .filter(Boolean);
  } catch {
    throw new Error(`❌ Row ${rowNum}: Failed to parse ${fieldName}`);
  }
}
