-- CreateTable
CREATE TABLE "modifiers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "plays" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language_id" INTEGER NOT NULL,
    "repository_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metadata" JSONB,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "modifiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modifiers_slug_language_id_repository_id_key" ON "modifiers"("slug", "language_id", "repository_id");

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modifiers" ADD CONSTRAINT "modifiers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
