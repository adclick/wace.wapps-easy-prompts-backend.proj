/*
  Warnings:

  - You are about to drop the column `options` on the `modes` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `modes` table. All the data in the column will be lost.
  - You are about to drop the column `technology` on the `modes` table. All the data in the column will be lost.
  - Added the required column `model_name` to the `modes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_slug` to the `modes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_name` to the `modes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_slug` to the `modes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_name` to the `modes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_slug` to the `modes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modes" DROP COLUMN "options",
DROP COLUMN "provider",
DROP COLUMN "technology",
ADD COLUMN     "model_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "model_slug" VARCHAR(255) NOT NULL,
ADD COLUMN     "provider_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "provider_slug" VARCHAR(255) NOT NULL,
ADD COLUMN     "technology_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "technology_slug" VARCHAR(255) NOT NULL;
