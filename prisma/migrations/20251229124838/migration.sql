/*
  Warnings:

  - You are about to drop the column `canonicalTag` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `canonicalTag` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `canonicalTag` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "canonicalTag",
ADD COLUMN     "canonicalUrl" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "canonicalTag",
ADD COLUMN     "canonicalUrl" TEXT;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "canonicalTag",
ADD COLUMN     "canonicalUrl" TEXT;
