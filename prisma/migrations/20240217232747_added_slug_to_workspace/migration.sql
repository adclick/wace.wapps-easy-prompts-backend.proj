/*
  Warnings:

  - A unique constraint covering the columns `[user_id,slug]` on the table `workspaces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `workspaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workspaces" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_user_id_slug_key" ON "workspaces"("user_id", "slug");
