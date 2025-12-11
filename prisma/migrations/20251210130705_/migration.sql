/*
  Warnings:

  - Changed the type of `addressType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'OFFICE', 'OTHER');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressType",
ADD COLUMN     "addressType" "AddressType" NOT NULL;
