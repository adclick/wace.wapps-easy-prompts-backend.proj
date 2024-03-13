-- CreateTable
CREATE TABLE "prompts_chat_messages_templates" (
    "prompt_chat_message_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "prompts_chat_messages_templates_pkey" PRIMARY KEY ("prompt_chat_message_id","template_id")
);

-- CreateTable
CREATE TABLE "threads_chat_messages_templates" (
    "thread_chat_message_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "threads_chat_messages_templates_pkey" PRIMARY KEY ("thread_chat_message_id","template_id")
);

-- CreateTable
CREATE TABLE "prompts_chat_messages_modifiers" (
    "prompt_chat_message_id" INTEGER NOT NULL,
    "modifier_id" INTEGER NOT NULL,

    CONSTRAINT "prompts_chat_messages_modifiers_pkey" PRIMARY KEY ("prompt_chat_message_id","modifier_id")
);

-- CreateTable
CREATE TABLE "threads_chat_messages_modifiers" (
    "thread_chat_message_id" INTEGER NOT NULL,
    "modifier_id" INTEGER NOT NULL,

    CONSTRAINT "threads_chat_messages_modifiers_pkey" PRIMARY KEY ("thread_chat_message_id","modifier_id")
);

-- AddForeignKey
ALTER TABLE "prompts_chat_messages_templates" ADD CONSTRAINT "prompts_chat_messages_templates_prompt_chat_message_id_fkey" FOREIGN KEY ("prompt_chat_message_id") REFERENCES "prompts_chat_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_chat_messages_templates" ADD CONSTRAINT "prompts_chat_messages_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_chat_messages_templates" ADD CONSTRAINT "threads_chat_messages_templates_thread_chat_message_id_fkey" FOREIGN KEY ("thread_chat_message_id") REFERENCES "threads_chat_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_chat_messages_templates" ADD CONSTRAINT "threads_chat_messages_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_chat_messages_modifiers" ADD CONSTRAINT "prompts_chat_messages_modifiers_prompt_chat_message_id_fkey" FOREIGN KEY ("prompt_chat_message_id") REFERENCES "prompts_chat_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_chat_messages_modifiers" ADD CONSTRAINT "prompts_chat_messages_modifiers_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_chat_messages_modifiers" ADD CONSTRAINT "threads_chat_messages_modifiers_thread_chat_message_id_fkey" FOREIGN KEY ("thread_chat_message_id") REFERENCES "threads_chat_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_chat_messages_modifiers" ADD CONSTRAINT "threads_chat_messages_modifiers_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
