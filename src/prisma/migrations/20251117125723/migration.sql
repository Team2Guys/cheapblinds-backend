/*
  Warnings:

  - You are about to drop the column `thumbnailText` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailText` on the `Product` table. All the data in the column will be lost.
  - The `productImages` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `thumbnailText` on the `Subcategory` table. All the data in the column will be lost.
  - Made the column `canonicalTag` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "thumbnailText",
ADD COLUMN     "thumbnailAltText" VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnailText",
ADD COLUMN     "thumbnailAltText" VARCHAR(255),
ALTER COLUMN "canonicalTag" SET NOT NULL,
DROP COLUMN "productImages",
ADD COLUMN     "productImages" JSONB[];

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "thumbnailText",
ADD COLUMN     "thumbnailAltText" VARCHAR(255);
