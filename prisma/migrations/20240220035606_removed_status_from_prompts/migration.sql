/*
  Warnings:

  - You are about to drop the column `status` on the `prompts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PromptStatus";
