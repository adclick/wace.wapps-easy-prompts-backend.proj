/*
  Warnings:

  - You are about to drop the column `language_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_language_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "language_id";
