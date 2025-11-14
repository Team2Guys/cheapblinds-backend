/*
  Warnings:

  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `canonicalTag` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `metaDescription` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - You are about to alter the column `metaTitle` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `customUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `breadCrumb` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lastEditedBy` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `shortDescription` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `VarChar(512)`.
  - A unique constraint covering the columns `[customUrl]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "breadCrumb" VARCHAR(255),
ADD COLUMN     "lastEditedBy" VARCHAR(255),
ADD COLUMN     "seoSchema" TEXT,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sale" VARCHAR(255),
ADD COLUMN     "thumbnailPublicId" VARCHAR(255),
ADD COLUMN     "thumbnailText" VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stock" SET DEFAULT 0,
ALTER COLUMN "discountPrice" SET DEFAULT 0,
ALTER COLUMN "productImages" DROP DEFAULT,
ALTER COLUMN "productImages" SET DATA TYPE TEXT[],
ALTER COLUMN "canonicalTag" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "metaTitle" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "customUrl" DROP NOT NULL,
ALTER COLUMN "customUrl" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "breadCrumb" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lastEditedBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnailUrl" DROP NOT NULL,
ALTER COLUMN "thumbnailUrl" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "breadCrumb" VARCHAR(255),
ADD COLUMN     "lastEditedBy" VARCHAR(255),
ADD COLUMN     "seoSchema" TEXT,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'PUBLISHED';

-- CreateIndex
CREATE UNIQUE INDEX "Product_customUrl_key" ON "Product"("customUrl");
