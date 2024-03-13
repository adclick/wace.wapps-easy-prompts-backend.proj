/*
  Warnings:

  - You are about to drop the column `response` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_id` on the `threads` table. All the data in the column will be lost.
  - Added the required column `content` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_id` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_prompt_id_fkey";

-- DropIndex
DROP INDEX "prompts_hash_idx";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "response",
DROP COLUMN "workspaceId";

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "prompt_id",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "provider_id" INTEGER,
ADD COLUMN     "slug" VARCHAR(255) NOT NULL,
ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
