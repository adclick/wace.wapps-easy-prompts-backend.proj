/*
  Warnings:

  - You are about to drop the column `hash` on the `crafts` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `languages` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `repositories` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `technologies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crafts" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "languages" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "parameters" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "repositories" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "technologies" DROP COLUMN "hash";
