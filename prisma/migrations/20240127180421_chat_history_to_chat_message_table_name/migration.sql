/*
  Warnings:

  - You are about to drop the `prompts_chathistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "prompts_chathistory";

-- CreateTable
CREATE TABLE "prompts_chat_messages" (
    "id" SERIAL NOT NULL,
    "prompt_id" INTEGER NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "prompts_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prompts_chat_messages_prompt_id_idx" ON "prompts_chat_messages"("prompt_id");

-- AddForeignKey
ALTER TABLE "prompts_chat_messages" ADD CONSTRAINT "prompts_chat_messages_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
