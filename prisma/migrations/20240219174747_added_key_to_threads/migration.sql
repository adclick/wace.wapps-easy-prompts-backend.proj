/*
  Warnings:

  - Added the required column `key` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "key" INTEGER NOT NULL;
