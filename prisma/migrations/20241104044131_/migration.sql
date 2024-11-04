/*
  Warnings:

  - You are about to drop the column `mononym` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "mononym",
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "preferredFirstName" DROP NOT NULL,
ALTER COLUMN "pronouns" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
