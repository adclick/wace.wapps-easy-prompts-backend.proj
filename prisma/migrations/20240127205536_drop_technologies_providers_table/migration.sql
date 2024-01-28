/*
  Warnings:

  - You are about to drop the `technologies_providers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "technologies_providers" DROP CONSTRAINT "technologies_providers_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "technologies_providers" DROP CONSTRAINT "technologies_providers_technology_id_fkey";

-- DropTable
DROP TABLE "technologies_providers";
