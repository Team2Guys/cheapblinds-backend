/*
  Warnings:

  - Changed the type of `addressType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressType",
ADD COLUMN     "addressType" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultBillingAddressId" TEXT,
ADD COLUMN     "defaultShippingAddressId" TEXT;

-- DropEnum
DROP TYPE "AddressType";
