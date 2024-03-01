-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "content_modified" TEXT;

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "content_modified" TEXT;
