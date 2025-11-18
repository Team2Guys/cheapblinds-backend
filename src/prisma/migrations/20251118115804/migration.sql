-- DropIndex
DROP INDEX "Product_name_key";

-- DropIndex
DROP INDEX "Subcategory_name_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" DROP NOT NULL;
