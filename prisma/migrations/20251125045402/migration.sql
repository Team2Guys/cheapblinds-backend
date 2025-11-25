/*
  Warnings:

  - You are about to drop the column `isActive` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive";
