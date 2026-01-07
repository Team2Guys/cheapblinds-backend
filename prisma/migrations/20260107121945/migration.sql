/*
  Warnings:

  - You are about to drop the column `color` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `drop` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `width` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[sku]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blindTypeId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fabricId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderItemOptionsId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "color",
ADD COLUMN     "blindTypeId" INTEGER NOT NULL,
ADD COLUMN     "fabricId" INTEGER NOT NULL,
ADD COLUMN     "finalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "orderItemOptionsId" TEXT NOT NULL,
ADD COLUMN     "recessType" TEXT,
ALTER COLUMN "productUrl" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "drop" SET DEFAULT 0,
ALTER COLUMN "drop" SET DATA TYPE INTEGER,
ALTER COLUMN "width" SET DEFAULT 1,
ALTER COLUMN "width" SET DATA TYPE INTEGER,
ALTER COLUMN "motorPrice" DROP NOT NULL,
ALTER COLUMN "motorPrice" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "discountPrice" DROP NOT NULL,
ALTER COLUMN "discountPrice" DROP DEFAULT,
ALTER COLUMN "motorPrice" DROP NOT NULL,
ALTER COLUMN "motorPrice" DROP DEFAULT;

-- CreateTable
CREATE TABLE "OrderItemOptions" (
    "id" TEXT NOT NULL,
    "headrailType" TEXT,
    "stackingStyle" TEXT,
    "lining" TEXT,
    "chainControl" TEXT,
    "chainSide" TEXT,

    CONSTRAINT "OrderItemOptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_sku_key" ON "OrderItem"("sku");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderItemOptionsId_fkey" FOREIGN KEY ("orderItemOptionsId") REFERENCES "OrderItemOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
