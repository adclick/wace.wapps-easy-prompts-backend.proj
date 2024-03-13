/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `languages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `modifiers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `parameters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `prompts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `prompts_chat_messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `threads` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `threads_chat_messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "modifiers" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "parameters" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "prompts_chat_messages" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "repositories" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "technologies" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "threads_chat_messages" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "workspaces" ADD COLUMN     "uuid" VARCHAR(255);

-- CreateIndex
CREATE INDEX "languages_uuid_idx" ON "languages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "languages_uuid_key" ON "languages"("uuid");

-- CreateIndex
CREATE INDEX "modifiers_uuid_idx" ON "modifiers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "modifiers_uuid_key" ON "modifiers"("uuid");

-- CreateIndex
CREATE INDEX "parameters_uuid_idx" ON "parameters"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "parameters_uuid_key" ON "parameters"("uuid");

-- CreateIndex
CREATE INDEX "prompts_uuid_idx" ON "prompts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "prompts_uuid_key" ON "prompts"("uuid");

-- CreateIndex
CREATE INDEX "prompts_chat_messages_uuid_idx" ON "prompts_chat_messages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "prompts_chat_messages_uuid_key" ON "prompts_chat_messages"("uuid");

-- CreateIndex
CREATE INDEX "templates_uuid_idx" ON "templates"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "templates_uuid_key" ON "templates"("uuid");

-- CreateIndex
CREATE INDEX "threads_uuid_idx" ON "threads"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "threads_uuid_key" ON "threads"("uuid");

-- CreateIndex
CREATE INDEX "threads_chat_messages_uuid_idx" ON "threads_chat_messages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "threads_chat_messages_uuid_key" ON "threads_chat_messages"("uuid");

-- CreateIndex
CREATE INDEX "users_uuid_idx" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");
