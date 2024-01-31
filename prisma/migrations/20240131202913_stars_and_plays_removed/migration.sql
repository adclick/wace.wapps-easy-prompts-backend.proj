/*
  Warnings:

  - You are about to drop the column `plays` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `plays` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `plays` on the `templates` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `templates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modifiers" DROP COLUMN "plays",
DROP COLUMN "stars";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "plays",
DROP COLUMN "stars";

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "plays",
DROP COLUMN "stars";
