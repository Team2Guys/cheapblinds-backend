/*
  Warnings:

  - Changed the type of `blindTypeId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fabricId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "blindTypeId",
ADD COLUMN     "blindTypeId" INTEGER NOT NULL,
DROP COLUMN "fabricId",
ADD COLUMN     "fabricId" INTEGER NOT NULL;
