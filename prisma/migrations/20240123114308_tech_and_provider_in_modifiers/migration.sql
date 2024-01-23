/*
  Warnings:

  - Added the required column `provider_id` to the `modifiers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_id` to the `modifiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modifiers" ADD COLUMN     "provider_id" INTEGER NOT NULL,
ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
