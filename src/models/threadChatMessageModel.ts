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
    temmplatesIds: number[],
    modifiersIds: number[],
) => {
    return await prisma.threadChatMessage.create({
        data: {
            role,
            message,
            thread_id,
            user_id,
            threads_chat_messages_modifiers: {
                createMany: {
                    data: modifiersIds.map(id => ({modifier_id: id}))
                }
            },
            threads_chat_messages_templates: {
                createMany: {
                    data: temmplatesIds.map(id => ({template_id: id}))
                }
            }
        }
    });
}

const deleteAllByThreadId = async (
    thread_id: number
) => {
    return await prisma.threadChatMessage.deleteMany({
        where: {
            thread_id
        }
    });
}

export default {
    createOne,
    deleteAllByThreadId
}