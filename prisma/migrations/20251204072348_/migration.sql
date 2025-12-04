/*
  Warnings:

  - You are about to drop the column `contactType` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `inquiryType` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "contactType",
ADD COLUMN     "inquiryType" "InquiryType" NOT NULL;
