-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

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
