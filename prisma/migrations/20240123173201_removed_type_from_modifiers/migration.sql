/*
  Warnings:

  - You are about to drop the column `type` on the `modifiers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modifiers" DROP COLUMN "type";

-- DropEnum
DROP TYPE "MODIFIER_TYPE";
