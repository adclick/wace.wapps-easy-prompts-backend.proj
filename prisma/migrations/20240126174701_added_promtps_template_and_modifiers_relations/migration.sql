/*
  Warnings:

  - You are about to drop the column `modifiers` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `templates` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `modifiers` on the `templates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modifiers" ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "modifiers",
DROP COLUMN "templates",
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "modifiers",
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "prompts_templates" (
    "prompt_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "prompts_templates_pkey" PRIMARY KEY ("prompt_id","template_id")
);

-- CreateTable
CREATE TABLE "prompts_modifiers" (
    "prompt_id" INTEGER NOT NULL,
    "modifier_id" INTEGER NOT NULL,

    CONSTRAINT "prompts_modifiers_pkey" PRIMARY KEY ("prompt_id","modifier_id")
);

-- CreateTable
CREATE TABLE "templates_modifiers" (
    "template_id" INTEGER NOT NULL,
    "modifier_id" INTEGER NOT NULL,

    CONSTRAINT "templates_modifiers_pkey" PRIMARY KEY ("template_id","modifier_id")
);

-- AddForeignKey
ALTER TABLE "prompts_templates" ADD CONSTRAINT "prompts_templates_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_templates" ADD CONSTRAINT "prompts_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_modifiers" ADD CONSTRAINT "prompts_modifiers_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_modifiers" ADD CONSTRAINT "prompts_modifiers_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_modifiers" ADD CONSTRAINT "templates_modifiers_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_modifiers" ADD CONSTRAINT "templates_modifiers_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
