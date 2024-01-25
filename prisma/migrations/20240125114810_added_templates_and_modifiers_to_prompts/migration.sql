/*
  Warnings:

  - You are about to drop the column `metadata` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `prompts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modifiers" DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "metadata",
ADD COLUMN     "modifiers" JSONB,
ADD COLUMN     "templates" JSONB;
