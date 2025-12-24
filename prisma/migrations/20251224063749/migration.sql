/*
  Warnings:

  - You are about to alter the column `maxHeight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `maxWidth` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `minHeight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `minWidth` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "maxHeight" SET DEFAULT 1,
ALTER COLUMN "maxHeight" SET DATA TYPE INTEGER,
ALTER COLUMN "maxWidth" SET DEFAULT 1,
ALTER COLUMN "maxWidth" SET DATA TYPE INTEGER,
ALTER COLUMN "minHeight" SET DEFAULT 0,
ALTER COLUMN "minHeight" SET DATA TYPE INTEGER,
ALTER COLUMN "minWidth" SET DEFAULT 0,
ALTER COLUMN "minWidth" SET DATA TYPE INTEGER;
