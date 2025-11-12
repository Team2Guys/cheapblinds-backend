/*
  Warnings:

  - You are about to drop the `BlacklistedToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlacklistedToken" DROP CONSTRAINT "BlacklistedToken_userId_fkey";

-- DropTable
DROP TABLE "BlacklistedToken";
