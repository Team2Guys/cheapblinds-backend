-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "canAddProduct" BOOLEAN NOT NULL DEFAULT false,
    "canEditProduct" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteProduct" BOOLEAN NOT NULL DEFAULT false,
    "canAddCategory" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteCategory" BOOLEAN NOT NULL DEFAULT false,
    "canEditCategory" BOOLEAN NOT NULL DEFAULT false,
    "canCheckProfit" BOOLEAN NOT NULL DEFAULT false,
    "canCheckRevenue" BOOLEAN NOT NULL DEFAULT false,
    "canCheckVisitors" BOOLEAN NOT NULL DEFAULT false,
    "canViewUsers" BOOLEAN NOT NULL DEFAULT false,
    "canViewSales" BOOLEAN NOT NULL DEFAULT false,
    "canViewAdmins" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalProducts" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalCategories" BOOLEAN NOT NULL DEFAULT false,
    "canAddSubCategory" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteSubCategory" BOOLEAN NOT NULL DEFAULT false,
    "canEditSubCategory" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalSubCategories" BOOLEAN NOT NULL DEFAULT false,
    "canAddBlog" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteBlog" BOOLEAN NOT NULL DEFAULT false,
    "canEditBlog" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalBlog" BOOLEAN NOT NULL DEFAULT false,
    "canAddRedirectUrls" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteRedirectUrls" BOOLEAN NOT NULL DEFAULT false,
    "canEditRedirectUrls" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalRedirectUrls" BOOLEAN NOT NULL DEFAULT false,
    "canViewAppointments" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isNewsletterSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" UUID NOT NULL,
    "otpHash" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
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

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "discountPrice" INTEGER,
    "thumbnailUrl" VARCHAR(512) NOT NULL,
    "thumbnailPublicId" VARCHAR(255) NOT NULL,
    "productImages" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "specifications" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "sale" TEXT DEFAULT '0',
    "saleDuration" TIMESTAMP(3),
    "canonicalTag" VARCHAR(255),
    "metaDescription" VARCHAR(160),
    "metaTitle" VARCHAR(70),
    "ogImage" VARCHAR(512),
    "ogUrl" VARCHAR(512),
    "ogTitle" VARCHAR(70),
    "thumbnailAltText" VARCHAR(255),
    "productImagesAltText" VARCHAR(255),
    "sections" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "saleCounter" TEXT,
    "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "filter" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "customUrl" VARCHAR(255),
    "shippingOptions" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "categoryId" UUID NOT NULL,
    "subcategoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "productId" UUID NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 1,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Otp_userId_idx" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_customUrl_key" ON "Category"("customUrl");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_name_key" ON "Subcategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_customUrl_key" ON "Subcategory"("customUrl");

-- CreateIndex
CREATE INDEX "Subcategory_categoryId_idx" ON "Subcategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_customUrl_key" ON "Product"("customUrl");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_subcategoryId_idx" ON "Product"("subcategoryId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
