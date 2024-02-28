/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `repositories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `technologies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `workspaces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "providers_uuid_idx" ON "providers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "providers_uuid_key" ON "providers"("uuid");

-- CreateIndex
CREATE INDEX "repositories_uuid_idx" ON "repositories"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_uuid_key" ON "repositories"("uuid");

-- CreateIndex
CREATE INDEX "technologies_uuid_idx" ON "technologies"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_uuid_key" ON "technologies"("uuid");

-- CreateIndex
CREATE INDEX "workspaces_uuid_idx" ON "workspaces"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_uuid_key" ON "workspaces"("uuid");
