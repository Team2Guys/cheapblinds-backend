/*
  Warnings:

  - You are about to drop the column `breadCrumb` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `customUrl` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `breadCrumb` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `customUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `height` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `width` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `breadCrumb` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `customUrl` on the `Subcategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Subcategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `posterImageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Category_customUrl_idx";

-- DropIndex
DROP INDEX "Category_customUrl_key";

-- DropIndex
DROP INDEX "Product_customUrl_idx";

-- DropIndex
DROP INDEX "Product_customUrl_key";

-- DropIndex
DROP INDEX "Subcategory_customUrl_idx";

-- DropIndex
DROP INDEX "Subcategory_customUrl_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "breadCrumb",
DROP COLUMN "customUrl",
ADD COLUMN     "breadcrumb" VARCHAR(255),
ADD COLUMN     "slug" VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "breadCrumb",
DROP COLUMN "customUrl",
ADD COLUMN     "breadcrumb" VARCHAR(255),
ADD COLUMN     "slug" VARCHAR(255) NOT NULL,
ADD COLUMN     "weight" DECIMAL(65,30) DEFAULT 0,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "metaTitle" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discountPrice" SET DEFAULT 0,
ALTER COLUMN "discountPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "posterImageUrl" SET NOT NULL,
ALTER COLUMN "height" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "width" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "breadCrumb",
DROP COLUMN "customUrl",
ADD COLUMN     "breadcrumb" VARCHAR(255),
ADD COLUMN     "slug" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_slug_key" ON "Subcategory"("slug");

-- CreateIndex
CREATE INDEX "Subcategory_slug_idx" ON "Subcategory"("slug");
