/*
  Warnings:

  - You are about to drop the column `composition` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "composition",
ADD COLUMN     "material" TEXT;
