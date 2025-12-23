/*
  Warnings:

  - You are about to drop the column `discountPrice` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "discountPrice";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discountPrice";
