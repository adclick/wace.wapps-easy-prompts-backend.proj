/*
  Warnings:

  - You are about to drop the column `score` on the `crafts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crafts" DROP COLUMN "score",
ADD COLUMN     "plays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stars" INTEGER NOT NULL DEFAULT 0;
