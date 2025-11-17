/*
  Warnings:

  - You are about to drop the column `thumbnailAltText` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPublicId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailAltText` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPublicId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailAltText` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPublicId` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "thumbnailAltText",
DROP COLUMN "thumbnailPublicId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnailAltText",
DROP COLUMN "thumbnailPublicId",
ALTER COLUMN "productImages" SET DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "thumbnailAltText",
DROP COLUMN "thumbnailPublicId";
