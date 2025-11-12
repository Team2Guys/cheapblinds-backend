/*
  Warnings:

  - You are about to drop the column `email` on the `Otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "customUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalTag" TEXT,
    "thumbnailUrl" TEXT,
    "thumbnailPublicId" TEXT,
    "thumbnailText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "customUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalTag" TEXT,
    "thumbnailUrl" TEXT,
    "thumbnailPublicId" TEXT,
    "thumbnailText" TEXT,
    "categoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "thumbnailUrl" TEXT NOT NULL,
    "thumbnailPublicId" TEXT NOT NULL,
    "productImages" JSONB[],
    "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "specifications" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "sale" TEXT DEFAULT '0',
    "saleDuration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canonicalTag" TEXT,
    "metaDescription" TEXT,
    "metaTitle" TEXT,
    "ogImage" TEXT,
    "ogUrl" TEXT,
    "ogTitle" TEXT,
    "thumbnailAltText" TEXT,
    "productImagesAltText" TEXT,
    "sections" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "saleCounter" TEXT,
    "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "filter" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "customUrl" TEXT,
    "shippingOptions" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "categoryId" UUID NOT NULL,
    "subCategoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
