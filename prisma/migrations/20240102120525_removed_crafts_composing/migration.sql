/*
  Warnings:

  - You are about to drop the `composing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `metadata` to the `crafts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "composing" DROP CONSTRAINT "composing_composed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "composing" DROP CONSTRAINT "composing_composing_id_fkey";

-- AlterTable
ALTER TABLE "crafts" ADD COLUMN     "metadata" JSONB NOT NULL;

-- DropTable
DROP TABLE "composing";

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_external_id_idx" ON "users"("external_id");
