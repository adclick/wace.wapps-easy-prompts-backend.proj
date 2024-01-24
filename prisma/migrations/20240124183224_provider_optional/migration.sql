-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_provider_id_fkey";

-- AlterTable
ALTER TABLE "modifiers" ALTER COLUMN "provider_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "prompts" ALTER COLUMN "provider_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "provider_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
