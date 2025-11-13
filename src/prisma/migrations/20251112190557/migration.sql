/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subcategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_categoryId_fkey";

-- DropIndex
DROP INDEX "Product_subCategoryId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subCategoryId",
ADD COLUMN     "subcategoryId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Subcategory";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "subcategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "shortDescription" VARCHAR(255),
    "customUrl" VARCHAR(255),
    "metaTitle" VARCHAR(70),
    "metaDescription" VARCHAR(160),
    "canonicalTag" VARCHAR(255),
    "thumbnailUrl" VARCHAR(512),
    "thumbnailPublicId" VARCHAR(255),
    "thumbnailText" VARCHAR(255),
    "categoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_name_key" ON "subcategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_customUrl_key" ON "subcategory"("customUrl");

-- CreateIndex
CREATE INDEX "subcategory_categoryId_idx" ON "subcategory"("categoryId");

-- CreateIndex
CREATE INDEX "Product_subcategoryId_idx" ON "Product"("subcategoryId");

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
