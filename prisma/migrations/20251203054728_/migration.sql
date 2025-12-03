/*
  Warnings:

  - The `permissions` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motorPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Subcategory` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('ADD_PRODUCTS', 'EDIT_PRODUCTS', 'DELETE_PRODUCTS', 'ADD_CATEGORY', 'DELETE_CATEGORY', 'EDIT_CATEGORY', 'CHECK_PROFIT', 'CHECK_REVENUE', 'CHECK_VISITORS', 'VIEW_USERS', 'VIEW_SALES', 'VIEW_ADMINS', 'VIEW_TOTAL_PRODUCTS', 'VIEW_TOTAL_CATEGORIES');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "permissions",
ADD COLUMN     "permissions" "Permissions"[] DEFAULT ARRAY[]::"Permissions"[];

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "discountPrice" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "motorPrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" ALTER COLUMN "slug" SET NOT NULL;
