/*
  Warnings:

  - You are about to drop the `ModifierRepository` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromptRepository` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateRepository` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModifierRepository" DROP CONSTRAINT "ModifierRepository_modifier_id_fkey";

-- DropForeignKey
ALTER TABLE "ModifierRepository" DROP CONSTRAINT "ModifierRepository_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "PromptRepository" DROP CONSTRAINT "PromptRepository_prompt_id_fkey";

-- DropForeignKey
ALTER TABLE "PromptRepository" DROP CONSTRAINT "PromptRepository_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "TemplateRepository" DROP CONSTRAINT "TemplateRepository_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "TemplateRepository" DROP CONSTRAINT "TemplateRepository_template_id_fkey";

-- DropTable
DROP TABLE "ModifierRepository";

-- DropTable
DROP TABLE "PromptRepository";

-- DropTable
DROP TABLE "TemplateRepository";

-- CreateTable
CREATE TABLE "prompts_repositories" (
    "prompt_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "prompts_repositories_pkey" PRIMARY KEY ("prompt_id","repository_id")
);

-- CreateTable
CREATE TABLE "templates_repositories" (
    "template_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "templates_repositories_pkey" PRIMARY KEY ("template_id","repository_id")
);

-- CreateTable
CREATE TABLE "modifiers_repositories" (
    "modifier_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "modifiers_repositories_pkey" PRIMARY KEY ("modifier_id","repository_id")
);

-- AddForeignKey
ALTER TABLE "prompts_repositories" ADD CONSTRAINT "prompts_repositories_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_repositories" ADD CONSTRAINT "prompts_repositories_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_repositories" ADD CONSTRAINT "templates_repositories_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_repositories" ADD CONSTRAINT "templates_repositories_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modifiers_repositories" ADD CONSTRAINT "modifiers_repositories_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modifiers_repositories" ADD CONSTRAINT "modifiers_repositories_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
