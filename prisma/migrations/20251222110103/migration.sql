/*
  Warnings:

  - You are about to drop the column `height` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productId" UUID,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "maxHeight" DECIMAL(65,30) NOT NULL DEFAULT 1,
ADD COLUMN     "maxWidth" DECIMAL(65,30) NOT NULL DEFAULT 1,
ADD COLUMN     "minHeight" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "minWidth" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
