/*
  Warnings:

  - You are about to drop the `AdminPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminPermission" DROP CONSTRAINT "AdminPermission_adminId_fkey";

-- DropForeignKey
ALTER TABLE "AdminPermission" DROP CONSTRAINT "AdminPermission_permissionId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "AdminPermission";

-- DropTable
DROP TABLE "Permission";
