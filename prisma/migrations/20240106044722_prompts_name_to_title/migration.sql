/*
  Warnings:

  - You are about to drop the column `name` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `prompts` table. All the data in the column will be lost.
  - Added the required column `title` to the `modifiers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `prompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modifiers" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;
