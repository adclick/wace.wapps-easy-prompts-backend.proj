-- CreateTable
CREATE TABLE "threads_chat_messages" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "threads_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "threads_templates" (
    "thread_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "threads_templates_pkey" PRIMARY KEY ("thread_id","template_id")
);

-- CreateTable
CREATE TABLE "threads_modifiers" (
    "thread_id" INTEGER NOT NULL,
    "modifier_id" INTEGER NOT NULL,

    CONSTRAINT "threads_modifiers_pkey" PRIMARY KEY ("thread_id","modifier_id")
);

-- CreateTable
CREATE TABLE "threads_parameters" (
    "thread_id" INTEGER NOT NULL,
    "parameter_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "threads_parameters_pkey" PRIMARY KEY ("thread_id","parameter_id")
);

-- CreateIndex
CREATE INDEX "threads_chat_messages_thread_id_idx" ON "threads_chat_messages"("thread_id");

-- AddForeignKey
ALTER TABLE "threads_chat_messages" ADD CONSTRAINT "threads_chat_messages_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_templates" ADD CONSTRAINT "threads_templates_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_templates" ADD CONSTRAINT "threads_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_modifiers" ADD CONSTRAINT "threads_modifiers_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_modifiers" ADD CONSTRAINT "threads_modifiers_modifier_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_parameters" ADD CONSTRAINT "threads_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "threads_parameters" ADD CONSTRAINT "threads_parameters_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
