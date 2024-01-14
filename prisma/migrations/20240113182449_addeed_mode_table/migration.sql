/*
  Warnings:

  - Added the required column `modeId` to the `prompts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_language_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_repository_id_fkey";

-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "modeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "modes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "technology" VARCHAR(255) NOT NULL,
    "options" JSON NOT NULL,

    CONSTRAINT "modes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modes_slug_key" ON "modes"("slug");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "modes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
