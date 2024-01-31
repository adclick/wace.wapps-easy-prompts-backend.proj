-- AlterTable
ALTER TABLE "modifiers" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "prompts" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "description" DROP NOT NULL;
