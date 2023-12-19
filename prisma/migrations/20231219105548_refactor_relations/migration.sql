/*
  Warnings:

  - The primary key for the `technologies_providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `technologies_providers` table. All the data in the column will be lost.
  - The primary key for the `users_repositories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users_repositories` table. All the data in the column will be lost.
  - You are about to drop the `modifiers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompts_modifiers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompts_parameters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `technologies_providers_parameters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates_modifiers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_id` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_login` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `theme` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CRAFT_TYPE" AS ENUM ('PROMPT', 'TEMPLATE', 'MODIFIER');

-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_language_id_fkey";

-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_language_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts_modifiers" DROP CONSTRAINT "prompts_modifiers_modifier_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts_modifiers" DROP CONSTRAINT "prompts_modifiers_prompt_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts_parameters" DROP CONSTRAINT "prompts_parameters_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts_parameters" DROP CONSTRAINT "prompts_parameters_prompt_id_fkey";

-- DropForeignKey
ALTER TABLE "technologies_providers_parameters" DROP CONSTRAINT "technologies_providers_parameters_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "technologies_providers_parameters" DROP CONSTRAINT "technologies_providers_parameters_technology_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_language_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_user_id_fkey";

-- DropForeignKey
ALTER TABLE "templates_modifiers" DROP CONSTRAINT "templates_modifiers_modifier_id_fkey";

-- DropForeignKey
ALTER TABLE "templates_modifiers" DROP CONSTRAINT "templates_modifiers_template_id_fkey";

-- AlterTable
ALTER TABLE "parameters" ADD COLUMN     "content" JSON NOT NULL,
ADD COLUMN     "provider_id" INTEGER NOT NULL,
ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "technologies_providers" DROP CONSTRAINT "technologies_providers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "technologies_providers_pkey" PRIMARY KEY ("technology_id", "provider_id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "first_login" SET NOT NULL,
ALTER COLUMN "first_login" SET DEFAULT true,
ALTER COLUMN "theme" SET NOT NULL;

-- AlterTable
ALTER TABLE "users_repositories" DROP CONSTRAINT "users_repositories_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_repositories_pkey" PRIMARY KEY ("user_id", "repository_id");

-- DropTable
DROP TABLE "modifiers";

-- DropTable
DROP TABLE "prompts";

-- DropTable
DROP TABLE "prompts_modifiers";

-- DropTable
DROP TABLE "prompts_parameters";

-- DropTable
DROP TABLE "technologies_providers_parameters";

-- DropTable
DROP TABLE "templates";

-- DropTable
DROP TABLE "templates_modifiers";

-- CreateTable
CREATE TABLE "crafts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "score" INTEGER NOT NULL DEFAULT 50,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "language_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,
    "technology_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_id" INTEGER,
    "type" "CRAFT_TYPE" NOT NULL DEFAULT 'PROMPT',

    CONSTRAINT "crafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crafting" (
    "crafted_by_id" INTEGER NOT NULL,
    "crafting_id" INTEGER NOT NULL,

    CONSTRAINT "crafting_pkey" PRIMARY KEY ("crafted_by_id","crafting_id")
);

-- CreateTable
CREATE TABLE "crafts_parameters" (
    "craft_id" INTEGER NOT NULL,
    "parameter_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "crafts_parameters_pkey" PRIMARY KEY ("craft_id","parameter_id")
);

-- AddForeignKey
ALTER TABLE "parameters" ADD CONSTRAINT "parameters_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parameters" ADD CONSTRAINT "parameters_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafting" ADD CONSTRAINT "crafting_crafted_by_id_fkey" FOREIGN KEY ("crafted_by_id") REFERENCES "crafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crafting" ADD CONSTRAINT "crafting_crafting_id_fkey" FOREIGN KEY ("crafting_id") REFERENCES "crafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crafts_parameters" ADD CONSTRAINT "crafts_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts_parameters" ADD CONSTRAINT "crafts_parameters_craft_id_fkey" FOREIGN KEY ("craft_id") REFERENCES "crafts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
