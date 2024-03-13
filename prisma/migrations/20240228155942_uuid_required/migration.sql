/*
  Warnings:

  - Made the column `uuid` on table `languages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `modifiers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `parameters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `prompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `prompts_chat_messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `repositories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `technologies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `threads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `threads_chat_messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `workspaces` required. This step will fail if there are existing NULL values in that column.

*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

UPDATE "languages" SET uuid = uuid_generate_v4();
UPDATE "modifiers" SET uuid = uuid_generate_v4();
UPDATE "parameters" SET uuid = uuid_generate_v4();
UPDATE "prompts" SET uuid = uuid_generate_v4();
UPDATE "prompts_chat_messages" SET uuid = uuid_generate_v4();
UPDATE "providers" SET uuid = uuid_generate_v4();
UPDATE "repositories" SET uuid = uuid_generate_v4();
UPDATE "technologies" SET uuid = uuid_generate_v4();
UPDATE "templates" SET uuid = uuid_generate_v4();
UPDATE "threads" SET uuid = uuid_generate_v4();
UPDATE "threads_chat_messages" SET uuid = uuid_generate_v4();
UPDATE "users" SET uuid = uuid_generate_v4();
UPDATE "workspaces" SET uuid = uuid_generate_v4();


-- AlterTable
ALTER TABLE "languages" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "modifiers" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "parameters" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "prompts" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "prompts_chat_messages" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "providers" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "repositories" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "technologies" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads_chat_messages" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "workspaces" ALTER COLUMN "uuid" SET NOT NULL;
