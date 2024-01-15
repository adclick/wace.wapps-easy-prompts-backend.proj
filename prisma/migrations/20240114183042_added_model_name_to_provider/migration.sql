/*
  Warnings:

  - You are about to drop the column `mode_id` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the `modes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug,model_slug]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `model_name` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_slug` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_mode_id_fkey";

-- DropIndex
DROP INDEX "providers_slug_key";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "mode_id";

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "model_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "model_slug" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "modes";

-- CreateIndex
CREATE UNIQUE INDEX "providers_slug_model_slug_key" ON "providers"("slug", "model_slug");
