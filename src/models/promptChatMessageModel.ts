import { Modifier, PrismaClient, Template } from "@prisma/client";

const prisma = new PrismaClient();


export interface PromptChatMessage {
    role: string,
    message: string,
    threads_chat_messages_templates: {template: Template}[],
    threads_chat_messages_modifiers: {modifier: Modifier}[],
}

const createOne = async (
    role: string,
    message: string,
    prompt_id: number,
    user_id: number,
    temmplatesIds: number[],
    modifiersIds: number[],
) => {
    return await prisma.promptChatMessage.create({
        data: {
            role,
            message,
            prompt_id,
            user_id,
            prompts_chat_messages_modifiers: {
                createMany: {
                    data: modifiersIds.map(id => ({modifier_id: id}))
                }
            },
            prompts_chat_messages_templates: {
                createMany: {
                    data: temmplatesIds.map(id => ({template_id: id}))
                }
            }
        }
    });
}

const deleteAllByPromptId = async (
    prompt_id: number
) => {
    return await prisma.promptChatMessage.deleteMany({
        where: {
            prompt_id
        }
    });
}

export default {
    createOne,
    deleteAllByPromptId
}