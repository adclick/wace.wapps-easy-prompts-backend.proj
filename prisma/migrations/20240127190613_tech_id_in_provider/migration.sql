/*
  Warnings:

  - Added the required column `technology_id` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
DELETE FROM "technologies_providers";

DELETE FROM "providers";

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
