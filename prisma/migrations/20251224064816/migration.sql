/*
  Warnings:

  - Added the required column `blindTypeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fabricId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "blindTypeId" TEXT NOT NULL,
ADD COLUMN     "fabricId" TEXT NOT NULL;
