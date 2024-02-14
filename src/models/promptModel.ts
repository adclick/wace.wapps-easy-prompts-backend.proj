import { Prisma, PrismaClient } from "@prisma/client";
import { PromptChatMessage } from "./promptChatMessageModel";
import { PromptParameter } from "./promptParameter";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.prompt.findUnique({
        where: { id },
        include: {
            language: true,
            repository: true,
            technology: true,
            provider: true,
            user: true,
            prompts_templates: {
                include: {
                    template: true
                }
            },
            prompts_modifiers: {
                include: {
                    modifier: true
                }
            },
            prompts_parameters: true,
            prompts_chat_messages: true
        }
    });
}

const getAll = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    limit: number,
    offset: number
) => {
    return await prisma.prompt.findMany({
        where: {
            OR: [
                { title: { startsWith: search_term, mode: "insensitive" } },
                { title: { endsWith: search_term, mode: "insensitive" } },
                { title: { contains: search_term, mode: "insensitive" } },
                { description: { startsWith: search_term, mode: "insensitive" } },
                { description: { endsWith: search_term, mode: "insensitive" } },
                { description: { contains: search_term, mode: "insensitive" } },
                { content: { startsWith: search_term, mode: "insensitive" } },
                { content: { endsWith: search_term, mode: "insensitive" } },
                { content: { contains: search_term, mode: "insensitive" } },
            ],
            language: { id: { in: languages_ids } },
            repository: {
                OR: [
                    {
                        users_repositories: {
                            some: {
                                user: { external_id },
                                repository_id: {
                                    in: repositories_ids
                                }
                            }
                        }
                    },
                    {
                        user: { external_id },
                        id: {
                            in: repositories_ids
                        }
                    }
                ]
            },
            technology: { id: { in: technologies_ids } },
        },
        select: {
            id: true,
            title: true,
            description: true,
            response: true,
            slug: true,
            created_at: true,
            public: true,
            user: {
                select: {
                    external_id: true,
                    email: true,
                    username: true,
                }
            },
            language: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            repository: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            technology: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            provider: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    model_name: true,
                    model_slug: true,
                    technology: true,
                    parameters: true
                },
            },
            prompts_parameters: {
                select: {
                    value: true,
                    parameter: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            data: true,
                            value: true
                        }
                    }
                }
            },
            prompts_templates: {
                include: {
                    template: {
                        select: {
                            id: true,
                            title: true,
                            slug: true
                        }
                    }
                }
            },
            prompts_modifiers: {
                include: {
                    modifier: {
                        select: {
                            id: true,
                            title: true,
                            slug: true
                        }
                    }
                }
            },
        },
        orderBy: [{ id: "desc" }],
        take: limit,
        skip: offset
    });
}

const createOne = async (
    user_id: number,
    title: string,
    slug: string,
    description: string,
    content: string,
    response: string,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
    templatesIds: number[],
    modifiersIds: number[],
    chatMessages: PromptChatMessage[],
    promptParameters: PromptParameter[]
) => {
    const templates_ids = templatesIds.map(t => {
        return { template_id: t };
    });

    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m };
    });

    return await prisma.prompt.create({
        data: {
            title,
            slug,
            description,
            content,
            response,
            language_id,
            repository_id,
            technology_id,
            provider_id,
            user_id,
            prompts_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            prompts_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
            prompts_chat_messages: {
                createMany: {
                    data: chatMessages
                }
            },
            prompts_parameters: {
                createMany: {
                    data: promptParameters
                }
            }
        },
    })
}

const updateOne = async (
    id: number,
    user_id: number,
    title: string,
    slug: string,
    description: string,
    content: string,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
    templatesIds: number[],
    modifiersIds: number[],
) => {
    const templates_ids = templatesIds.map(t => {
        return { template_id: t };
    });

    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m };
    });

    await prisma.promptTemplate.deleteMany({
        where: {
            prompt_id: id
        }
    });

    await prisma.promptModifier.deleteMany({
        where: {
            prompt_id: id
        }
    });

    return await prisma.prompt.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            content,
            language_id,
            repository_id,
            technology_id,
            provider_id,
            user_id,
            prompts_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            prompts_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
        },
    })
}

const deleteOne = async (id: number) => {
    return await prisma.prompt.delete({
        where: { id }
    })
}

export default {
    getOneById,
    getAll,
    createOne,
    updateOne,
    deleteOne,
}