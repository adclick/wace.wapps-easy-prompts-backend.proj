-- CreateTable
CREATE TABLE "prompts_chathistory" (
    "id" SERIAL NOT NULL,
    "prompt_id" INTEGER NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "prompts_chathistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prompts_chathistory_prompt_id_idx" ON "prompts_chathistory"("prompt_id");
