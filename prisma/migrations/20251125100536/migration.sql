/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "posterImageUrl" VARCHAR(512);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "posterImageUrl" VARCHAR(512);

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "posterImageUrl" VARCHAR(512);
