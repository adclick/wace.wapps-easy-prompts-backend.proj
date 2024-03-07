import { Modifier } from "@prisma/client";

export interface PromptChatMessage {
    role: string,
    message: string,
    threads_chat_messages_modifiers: {modifier: Modifier}[]
}