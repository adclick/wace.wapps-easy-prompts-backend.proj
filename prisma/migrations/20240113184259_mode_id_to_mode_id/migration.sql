/*
  Warnings:

  - You are about to drop the column `modeId` on the `prompts` table. All the data in the column will be lost.
  - Added the required column `mode_id` to the `prompts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_modeId_fkey";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "modeId",
ADD COLUMN     "mode_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_mode_id_fkey" FOREIGN KEY ("mode_id") REFERENCES "modes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
