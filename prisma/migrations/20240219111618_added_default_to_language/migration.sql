-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

UPDATE languages SET "default" = true WHERE slug = 'pt';