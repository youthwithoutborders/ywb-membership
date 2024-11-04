/*
  Warnings:

  - You are about to drop the column `officialEmail` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "officialEmail",
ADD COLUMN     "companyEmail" TEXT;
