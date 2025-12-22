/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productId",
DROP COLUMN "productVariantId",
ADD COLUMN     "composition" TEXT,
ADD COLUMN     "discountPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "height" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "isMotorized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "motorPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "width" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "posterImageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "composition" TEXT,
ADD COLUMN     "discountPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "height" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "isMotorized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "measuringGuide" TEXT,
ADD COLUMN     "motorPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "pattern" TEXT,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "width" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ProductVariant";
