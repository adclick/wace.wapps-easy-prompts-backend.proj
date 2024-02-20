-- CreateEnum
CREATE TYPE "PromptStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "status" "PromptStatus" NOT NULL DEFAULT 'DRAFT';

-- CUSTOM: update prompts to initialize them with the publihed status
UPDATE prompts SET status='PUBLISHED'