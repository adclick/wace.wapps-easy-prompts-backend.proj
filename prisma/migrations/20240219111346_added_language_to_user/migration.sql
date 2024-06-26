/*
  Warnings:

  - Added the required column `language_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language_id" INTEGER;

-- CUSTOM: update all users with default language
UPDATE users SET language_id=(SELECT id from languages WHERE slug = 'pt');

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
