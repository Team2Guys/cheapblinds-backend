-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "addressType" SET DEFAULT 'HOME';

-- AlterTable
ALTER TABLE "Inquiry" ALTER COLUMN "inquiryType" SET DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "defaultBillingAddressId" SET DEFAULT '',
ALTER COLUMN "defaultShippingAddressId" SET DEFAULT '';
