/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `shortDescription` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customUrl` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `metaTitle` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `metaDescription` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - You are about to alter the column `canonicalTag` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailUrl` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `thumbnailPublicId` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailText` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `thumbnailPublicId` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `canonicalTag` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `metaDescription` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - You are about to alter the column `metaTitle` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `ogImage` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `ogUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `ogTitle` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `thumbnailAltText` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `productImagesAltText` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `userEmail` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Review` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `shortDescription` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customUrl` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `metaTitle` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `metaDescription` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - You are about to alter the column `canonicalTag` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailUrl` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `thumbnailPublicId` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `thumbnailText` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[customUrl]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customUrl]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customUrl]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customUrl" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "metaTitle" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "canonicalTag" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnailUrl" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "thumbnailPublicId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnailText" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "stock" SET DEFAULT 0,
ALTER COLUMN "thumbnailUrl" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "thumbnailPublicId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "productImages" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "saleDuration" DROP NOT NULL,
ALTER COLUMN "saleDuration" DROP DEFAULT,
ALTER COLUMN "canonicalTag" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "metaTitle" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "ogImage" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "ogUrl" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "ogTitle" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "thumbnailAltText" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "productImagesAltText" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customUrl" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userEmail",
DROP COLUMN "userName",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" UUID,
ALTER COLUMN "stars" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customUrl" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "metaTitle" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "canonicalTag" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnailUrl" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "thumbnailPublicId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnailText" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Category_customUrl_key" ON "Category"("customUrl");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Otp_userId_idx" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_customUrl_key" ON "Product"("customUrl");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_subCategoryId_idx" ON "Product"("subCategoryId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_customUrl_key" ON "SubCategory"("customUrl");

-- CreateIndex
CREATE INDEX "SubCategory_categoryId_idx" ON "SubCategory"("categoryId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
