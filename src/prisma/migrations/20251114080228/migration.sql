/*
  Warnings:

  - You are about to drop the column `colors` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `filter` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ogImage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ogTitle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ogUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productImagesAltText` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sale` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `saleCounter` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `saleDuration` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sections` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shippingOptions` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `specifications` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailAltText` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPublicId` on the `Product` table. All the data in the column will be lost.
  - Changed the type of `thumbnailUrl` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `customUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropIndex
DROP INDEX "Product_customUrl_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colors",
DROP COLUMN "filter",
DROP COLUMN "ogImage",
DROP COLUMN "ogTitle",
DROP COLUMN "ogUrl",
DROP COLUMN "productImagesAltText",
DROP COLUMN "sale",
DROP COLUMN "saleCounter",
DROP COLUMN "saleDuration",
DROP COLUMN "sections",
DROP COLUMN "shippingOptions",
DROP COLUMN "sizes",
DROP COLUMN "specifications",
DROP COLUMN "thumbnailAltText",
DROP COLUMN "thumbnailPublicId",
ADD COLUMN     "breadCrumb" TEXT,
ADD COLUMN     "lastEditedBy" TEXT,
ADD COLUMN     "seoSchema" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "status" "ProductStatus" DEFAULT 'PUBLISHED',
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "stock" DROP DEFAULT,
DROP COLUMN "thumbnailUrl",
ADD COLUMN     "thumbnailUrl" JSONB NOT NULL,
ALTER COLUMN "canonicalTag" SET DATA TYPE TEXT,
ALTER COLUMN "metaDescription" SET DATA TYPE TEXT,
ALTER COLUMN "metaTitle" SET DATA TYPE TEXT,
ALTER COLUMN "customUrl" SET NOT NULL,
ALTER COLUMN "customUrl" SET DATA TYPE TEXT;
