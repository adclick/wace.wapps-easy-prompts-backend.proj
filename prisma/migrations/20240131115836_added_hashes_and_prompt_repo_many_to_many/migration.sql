-- AlterTable
ALTER TABLE "modifiers" ADD COLUMN     "hash" TEXT;

-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "hash" TEXT;

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "hash" TEXT;

-- CreateTable
CREATE TABLE "PromptRepository" (
    "prompt_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "PromptRepository_pkey" PRIMARY KEY ("prompt_id","repository_id")
);

-- CreateTable
CREATE TABLE "TemplateRepository" (
    "template_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "TemplateRepository_pkey" PRIMARY KEY ("template_id","repository_id")
);

-- CreateTable
CREATE TABLE "ModifierRepository" (
    "modifier_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,

    CONSTRAINT "ModifierRepository_pkey" PRIMARY KEY ("modifier_id","repository_id")
);

-- CreateIndex
CREATE INDEX "modifiers_hash_idx" ON "modifiers" USING HASH ("hash");

-- CreateIndex
CREATE INDEX "prompts_hash_idx" ON "prompts" USING HASH ("hash");

-- CreateIndex
CREATE INDEX "templates_hash_idx" ON "templates" USING HASH ("hash");

-- AddForeignKey
ALTER TABLE "PromptRepository" ADD CONSTRAINT "PromptRepository_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromptRepository" ADD CONSTRAINT "PromptRepository_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TemplateRepository" ADD CONSTRAINT "TemplateRepository_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TemplateRepository" ADD CONSTRAINT "TemplateRepository_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ModifierRepository" ADD CONSTRAINT "ModifierRepository_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ModifierRepository" ADD CONSTRAINT "ModifierRepository_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
