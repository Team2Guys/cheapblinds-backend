/*
  Warnings:

  - The `measuringGuide` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "canonicalTag" DROP NOT NULL,
DROP COLUMN "measuringGuide",
ADD COLUMN     "measuringGuide" JSONB[] DEFAULT ARRAY[]::JSONB[];
