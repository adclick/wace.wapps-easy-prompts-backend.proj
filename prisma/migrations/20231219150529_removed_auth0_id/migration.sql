/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `auth0_id` on the `users` table. All the data in the column will be lost.
  - The primary key for the `users_repositories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "crafts" DROP CONSTRAINT "crafts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "repositories" DROP CONSTRAINT "repositories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_repositories" DROP CONSTRAINT "users_repositories_user_id_fkey";

-- DropIndex
DROP INDEX "users_auth0_id_key";

-- AlterTable
ALTER TABLE "crafts" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "repositories" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "auth0_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "users_repositories" DROP CONSTRAINT "users_repositories_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_repositories_pkey" PRIMARY KEY ("user_id", "repository_id");

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "crafts" ADD CONSTRAINT "crafts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_repositories" ADD CONSTRAINT "users_repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
