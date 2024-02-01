/*
  Warnings:

  - Made the column `value` on table `parameters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parameters" ALTER COLUMN "value" SET NOT NULL;
