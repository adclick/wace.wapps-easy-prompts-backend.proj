-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "workspaceId" INTEGER;

-- AlterTable
ALTER TABLE "workspaces" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
