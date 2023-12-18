-- AlterTable
ALTER TABLE "modifiers" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "prompts" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "first_login" BOOLEAN,
ADD COLUMN     "theme" VARCHAR(255);
