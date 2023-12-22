/*
  Warnings:

  - You are about to drop the `crafting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "crafting" DROP CONSTRAINT "crafting_crafted_by_id_fkey";

-- DropForeignKey
ALTER TABLE "crafting" DROP CONSTRAINT "crafting_crafting_id_fkey";

-- DropTable
DROP TABLE "crafting";

-- CreateTable
CREATE TABLE "composing" (
    "composed_by_id" INTEGER NOT NULL,
    "composing_id" INTEGER NOT NULL,

    CONSTRAINT "composing_pkey" PRIMARY KEY ("composed_by_id","composing_id")
);

-- AddForeignKey
ALTER TABLE "composing" ADD CONSTRAINT "composing_composed_by_id_fkey" FOREIGN KEY ("composed_by_id") REFERENCES "crafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composing" ADD CONSTRAINT "composing_composing_id_fkey" FOREIGN KEY ("composing_id") REFERENCES "crafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
