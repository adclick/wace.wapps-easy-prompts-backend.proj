/*
  Warnings:

  - Made the column `content_modified` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content_modified` on table `threads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "prompts" SET content_modified=content;
ALTER TABLE "prompts" ALTER COLUMN "content_modified" SET NOT NULL;

-- AlterTable
UPDATE "threads" SET content_modified=content;
ALTER TABLE "threads" ALTER COLUMN "content_modified" SET NOT NULL;
