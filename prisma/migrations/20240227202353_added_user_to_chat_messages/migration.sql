/*
  Warnings:

  - Added the required column `user_id` to the `prompts_chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `threads_chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prompts_chat_messages" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "collapsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "threads_chat_messages" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "prompts_chat_messages" ADD CONSTRAINT "prompts_chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_chat_messages" ADD CONSTRAINT "threads_chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
