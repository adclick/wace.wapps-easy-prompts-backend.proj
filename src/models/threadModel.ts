import { PrismaClient } from "@prisma/client";
import { ThreadChatMessage } from "./threadChatMessageModel";
import { ThreadParameter } from "./threadParameter";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.thread.findUnique({
        where: { id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: true,
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const getAllByWorkspace = async (workspace_id: number) => {
    return await prisma.thread.findMany({
        where: { workspace_id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: true,
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const createOne = async (
    title: string,
    slug: string,
    key: string,
    content: string,
    response: string,
    user_id: number,
    workspace_id: number,
    technology_id: number,
    provider_id: number,
    templatesIds: number[],
    modifiersIds: number[],
    threadChatMessages: ThreadChatMessage[],
    threadParameters: ThreadParameter[]
) => {
    const templates_ids = templatesIds.map(t => {
        return { template_id: t };
    });

    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m };
    });

    return await prisma.thread.create({
        data: {
            title,
            slug,
            key,
            content,
            response,
            user_id,
            workspace_id,
            technology_id,
            provider_id,
            threads_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            threads_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
            threads_chat_messages: {
                createMany: {
                    data: threadChatMessages
                }
            },
            threads_parameters: {
                createMany: {
                    data: threadParameters
                }
            }
        }
    });
}

const updateOne = async (
    id: number,
    title: string,
    slug: string,
    key: string,
    content: string,
    response: string,
    user_id: number,
    workspace_id: number,
    technology_id: number,
    provider_id: number,
    templatesIds: number[],
    modifiersIds: number[],
    threadChatMessages: ThreadChatMessage[]
) => {
    const templates_ids = templatesIds.map(t => {
        return { template_id: t };
    });

    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m };
    });

    await prisma.threadTemplate.deleteMany({
        where: {
            thread_id: id
        }
    });

    await prisma.threadModifier.deleteMany({
        where: {
            thread_id: id
        }
    });

    await prisma.threadChatMessage.deleteMany({
        where: {
            thread_id: id
        }
    });

    return await prisma.thread.update({
        where: { id },
        data: {
            title,
            slug,
            key,
            content,
            response,
            user_id,
            workspace_id,
            technology_id,
            provider_id,
            threads_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            threads_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
            threads_chat_messages: {
                createMany: {
                    data: threadChatMessages
                }
            }
        }
    });
}



const deleteOne = async (id: number) => {
    return await prisma.thread.delete({
        where: { id }
    })
}


export default {
    getOneById,
    getAllByWorkspace,
    createOne,
    updateOne,
    deleteOne
}