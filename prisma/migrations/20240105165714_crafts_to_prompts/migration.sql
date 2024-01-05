/*
  Warnings:

  - You are about to drop the `crafts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `crafts_parameters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_language_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts_parameters" DROP CONSTRAINT "crafts_parameters_craft_id_fkey";

-- DropForeignKey
ALTER TABLE "crafts_parameters" DROP CONSTRAINT "crafts_parameters_parameter_id_fkey";

-- DropTable
DROP TABLE "crafts";

-- DropTable
DROP TABLE "crafts_parameters";

-- CreateTable
CREATE TABLE "prompts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "plays" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,
    "technology_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metadata" JSONB,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts_parameters" (
    "prompt_id" INTEGER NOT NULL,
    "parameter_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "prompts_parameters_pkey" PRIMARY KEY ("prompt_id","parameter_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompts_slug_language_id_repository_id_technology_id_key" ON "prompts"("slug", "language_id", "repository_id", "technology_id");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_parameters" ADD CONSTRAINT "prompts_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_parameters" ADD CONSTRAINT "prompts_parameters_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
