/*
  Warnings:

  - You are about to drop the column `canAddSubCategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDeleteSubCategory` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canEditSubCategory` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "canAddSubCategory",
DROP COLUMN "canDeleteSubCategory",
DROP COLUMN "canEditSubCategory",
ADD COLUMN     "canAddSubcategory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canDeleteSubcategory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditSubcategory" BOOLEAN NOT NULL DEFAULT false;
