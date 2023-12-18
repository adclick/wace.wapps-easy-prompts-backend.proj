/*
  Warnings:

  - You are about to drop the column `name_en` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `name_pt` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `name_en` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `name_pt` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `name_en` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `name_pt` on the `technologies` table. All the data in the column will be lost.
  - Added the required column `name` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `technologies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parameters" DROP COLUMN "name_en",
DROP COLUMN "name_pt",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "name_en",
DROP COLUMN "name_pt",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "technologies" DROP COLUMN "name_en",
DROP COLUMN "name_pt",
ADD COLUMN     "name" VARCHAR NOT NULL;
