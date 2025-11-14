/*
  Warnings:

  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Subcategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';

-- DropEnum
DROP TYPE "ProductStatus";
