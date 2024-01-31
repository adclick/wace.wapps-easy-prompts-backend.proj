/*
  Warnings:

  - You are about to drop the column `content` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `technology_id` on the `parameters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug,provider_id]` on the table `parameters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `parameters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "parameters" DROP CONSTRAINT "parameters_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "parameters" DROP CONSTRAINT "parameters_technology_id_fkey";

-- DropIndex
DROP INDEX "parameters_slug_key";

-- AlterTable
ALTER TABLE "parameters" DROP COLUMN "content",
DROP COLUMN "technology_id",
ADD COLUMN     "data" JSON NOT NULL;

-- CreateTable
CREATE TABLE "templates_parameters" (
    "template_id" INTEGER NOT NULL,
    "parameter_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "templates_parameters_pkey" PRIMARY KEY ("template_id","parameter_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parameters_slug_provider_id_key" ON "parameters"("slug", "provider_id");

-- AddForeignKey
ALTER TABLE "parameters" ADD CONSTRAINT "parameters_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_parameters" ADD CONSTRAINT "templates_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_parameters" ADD CONSTRAINT "templates_parameters_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
