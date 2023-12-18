/*
  Warnings:

  - Made the column `score` on table `modifiers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `modifiers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repository_id` on table `modifiers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language_id` on table `modifiers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repository_id` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language_id` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `technology_id` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provider_id` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repository_id` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language_id` on table `templates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "modifiers" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "repository_id" SET NOT NULL,
ALTER COLUMN "language_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "prompts" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "repository_id" SET NOT NULL,
ALTER COLUMN "language_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "technology_id" SET NOT NULL,
ALTER COLUMN "provider_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "repository_id" SET NOT NULL,
ALTER COLUMN "language_id" SET NOT NULL;
