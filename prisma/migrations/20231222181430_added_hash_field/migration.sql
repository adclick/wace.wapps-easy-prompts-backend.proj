/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `languages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,slug]` on the table `repositories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `crafts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `repositories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `technologies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "repositories_slug_key";

-- AlterTable
ALTER TABLE "crafts" ADD COLUMN     "hash" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "hash" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "parameters" ADD COLUMN     "hash" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "hash" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "repositories" ADD COLUMN     "hash" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "technologies" ADD COLUMN     "hash" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "languages_slug_key" ON "languages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_user_id_slug_key" ON "repositories"("user_id", "slug");
