import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPrompt = async (id: number) => {
    return await prisma.prompt.findUnique({
        where: {id},
        include: {
            provider: {
                select: {
                    slug: true
                }
            }
        }
    });
}

const getPrompts = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
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
        include: {
            user: {
                select: {
                    id: true,
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
                    slug: true
                }
            },
            prompts_parameters: {
                select: {
                    value: true,
                    parameter: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            content: true,
                            
                        }
                    }
                }
            }
        },
        orderBy: [{ created_at: "desc" }]
    });
}

const createPrompt = async (
    user_id: number,
    title: string,
    slug: string,
    description: string,
    content: string,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
) => {
    return await prisma.prompt.create({
        data: {
            title,
            slug,
            description,
            content,
            language_id,
            repository_id,
            technology_id,
            provider_id,
            user_id
        },
    })
}

const deletePrompt = async (id: number) => {
    return await prisma.prompt.delete({
        where: { id }
    })
}

export default {
    getPrompt,
    getPrompts,
    createPrompt,
    deletePrompt,
}