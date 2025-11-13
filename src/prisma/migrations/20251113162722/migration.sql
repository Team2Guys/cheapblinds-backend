/*
  Warnings:

  - You are about to drop the column `canAddBlog` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canAddCategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canAddProduct` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canAddRedirectUrls` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canAddSubcategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canCheckProfit` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canCheckRevenue` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canCheckVisitors` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteBlog` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteCategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteProduct` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteRedirectUrls` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteSubcategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditBlog` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditCategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditProduct` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditRedirectUrls` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditSubcategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewAdmins` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewAppointments` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewSales` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewTotalBlog` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewTotalCategories` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewTotalProducts` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewTotalRedirectUrls` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewTotalSubCategories` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canViewUsers` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "canAddBlog",
DROP COLUMN "canAddCategory",
DROP COLUMN "canAddProduct",
DROP COLUMN "canAddRedirectUrls",
DROP COLUMN "canAddSubcategory",
DROP COLUMN "canCheckProfit",
DROP COLUMN "canCheckRevenue",
DROP COLUMN "canCheckVisitors",
DROP COLUMN "canDeleteBlog",
DROP COLUMN "canDeleteCategory",
DROP COLUMN "canDeleteProduct",
DROP COLUMN "canDeleteRedirectUrls",
DROP COLUMN "canDeleteSubcategory",
DROP COLUMN "canEditBlog",
DROP COLUMN "canEditCategory",
DROP COLUMN "canEditProduct",
DROP COLUMN "canEditRedirectUrls",
DROP COLUMN "canEditSubcategory",
DROP COLUMN "canViewAdmins",
DROP COLUMN "canViewAppointments",
DROP COLUMN "canViewSales",
DROP COLUMN "canViewTotalBlog",
DROP COLUMN "canViewTotalCategories",
DROP COLUMN "canViewTotalProducts",
DROP COLUMN "canViewTotalRedirectUrls",
DROP COLUMN "canViewTotalSubCategories",
DROP COLUMN "canViewUsers";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPermission" (
    "adminId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "AdminPermission_pkey" PRIMARY KEY ("adminId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE INDEX "AdminPermission_adminId_idx" ON "AdminPermission"("adminId");

-- CreateIndex
CREATE INDEX "AdminPermission_permissionId_idx" ON "AdminPermission"("permissionId");

-- AddForeignKey
ALTER TABLE "AdminPermission" ADD CONSTRAINT "AdminPermission_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminPermission" ADD CONSTRAINT "AdminPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
