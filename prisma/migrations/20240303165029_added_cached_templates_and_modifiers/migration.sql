/*
  Warnings:

  - You are about to drop the column `content_modified` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `content_modified` on the `threads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "content_modified",
ADD COLUMN     "modifiers" JSONB[],
ADD COLUMN     "templates" JSONB[];

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "modifiers" JSONB[];

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "content_modified",
ADD COLUMN     "modifiers" JSONB[],
ADD COLUMN     "templates" JSONB[];
