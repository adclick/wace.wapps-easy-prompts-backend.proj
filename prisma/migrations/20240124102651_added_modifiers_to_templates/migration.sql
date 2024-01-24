/*
  Warnings:

  - You are about to drop the column `metadata` on the `templates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "templates" DROP COLUMN "metadata",
ADD COLUMN     "modifiers" JSONB;
