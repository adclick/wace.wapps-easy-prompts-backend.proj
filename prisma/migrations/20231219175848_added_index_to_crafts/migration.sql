/*
  Warnings:

  - A unique constraint covering the columns `[slug,language_id,repository_id,technology_id]` on the table `crafts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "crafts_slug_language_id_repository_id_technology_id_key" ON "crafts"("slug", "language_id", "repository_id", "technology_id");
