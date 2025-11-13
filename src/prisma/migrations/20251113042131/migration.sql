/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `subcategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropIndex
DROP INDEX "Product_subCategoryId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subCategoryId",
ADD COLUMN     "subcategoryId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Product_subcategoryId_idx" ON "Product"("subcategoryId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
