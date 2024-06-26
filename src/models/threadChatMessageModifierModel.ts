import { Modifier, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ThreadChatMessageModifier {
    modifier: Modifier
}

const createMany = async (thread_chat_message_id: number, modifiersIds: number[]) => {
    const data = modifiersIds.map(modifier_id => {
        return {
            thread_chat_message_id,
            modifier_id
        }
    })

    return await prisma.threadChatMessageModifier.createMany({ data })
}

export default {
    createMany
}