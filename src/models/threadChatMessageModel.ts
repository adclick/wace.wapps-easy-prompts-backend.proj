import { PrismaClient } from "@prisma/client";
import { ThreadChatMessageModifier } from "./threadChatMessageModifierModel";

const prisma = new PrismaClient();

export interface ThreadChatMessage {
    role: string,
    message: string,
}

const createOne = async (
    role: string,
    message: string,
    thread_id: number,
    user_id: number,
    modifiersIds: number[],
) => {
    const modifiers = modifiersIds.map(m => ({
        modifier_id: m
    }))

    return await prisma.threadChatMessage.create({
        data: {
            role,
            message,
            thread_id,
            user_id,
            threads_chat_messages_modifiers: {
                createMany: {
                    data: modifiers
                }
            }
        }
    });
}

export default {
    createOne
}