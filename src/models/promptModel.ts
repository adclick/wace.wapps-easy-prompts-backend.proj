import { PrismaClient } from "@prisma/client";
import { PromptChatMessage } from "./promptChatMessageModel";
import { PromptParameter } from "./promptParameter";
import userModel from "./userModel";

const prisma = new PrismaClient();

export const PUBLIC_FIELDS = {
    uuid: true,
    title: true,
    content: true,
    description: true,
    slug: true,
    created_at: true,
    public: true,
}

const getOneByUUID = async (uuid: string) => {
    return await prisma.prompt.findUnique({
        where: { uuid },
        include: {
            language: true,
            repository: true,
            technology: true,
            provider: {
                include: {
                    technology: true,
                    parameters: true
                }
            },
            user: true,
            prompts_templates: {
                include: {
                    template: {
                        include: {
                            templates_modifiers: true
                        }
                    }
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

const getOneById = async (id: number) => {
    return await prisma.prompt.findUnique({
        where: { id },
        include: {
            language: true,
            repository: true,
            technology: true,
            provider: {
                include: {
                    technology: true,
                    parameters: true
                }
            },
            user: true,
            prompts_templates: {
                include: {
                    template: {
                        include: {
                            templates_modifiers: true
                        }
                    }
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
            ...PUBLIC_FIELDS,
            user: { select: userModel.PUBLIC_FIELDS },
            language: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    slug: true,
                }
            },
            repository: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    slug: true,
                }
            },
            technology: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    slug: true,
                }
            },
            provider: {
                select: {
                    id: true,
                    uuid: true,
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
                            uuid: true,
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
                            uuid: true,
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
                            uuid: true,
                            title: true,
                            slug: true
                        }
                    }
                }
            },
            prompts_chat_messages: true,
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
    content_modified: string,
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

    const promptChatMessages = chatMessages.map(c => {
        return {
            ...c,
            user_id
        }
    })

    return await prisma.prompt.create({
        data: {
            title,
            slug,
            description,
            content,
            content_modified,
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
                    data: promptChatMessages
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
    content_modified: string,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
    templatesIds: number[],
    modifiersIds: number[],
    chatMessages: PromptChatMessage[],
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

    await prisma.promptChatMessage.deleteMany({
        where: {
            prompt_id: id
        }
    });

    const promptChatMessages = chatMessages.map(c => {
        return {
            ...c,
            user_id
        }
    })

    return await prisma.prompt.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            content,
            content_modified,
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
                    data: promptChatMessages
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
    getOneByUUID,
    getOneById,
    getAll,
    createOne,
    updateOne,
    deleteOne,
}