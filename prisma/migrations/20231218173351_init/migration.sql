/*
  Warnings:

  - You are about to drop the column `category_id` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `creator_id` on the `repositories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `templates` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `repositories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_category_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "repositories" DROP CONSTRAINT "repositories_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_category_id_fkey";

-- AlterTable
ALTER TABLE "modifiers" DROP COLUMN "category_id";

-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "category_id";

-- AlterTable
ALTER TABLE "repositories" DROP COLUMN "creator_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "categories";

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
