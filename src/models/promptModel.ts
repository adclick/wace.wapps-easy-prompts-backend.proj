import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.prompt.findUnique({
        where: { id },
        include: {
            technology: {
                select: {
                    name: true,
                    slug: true,
                    default: true
                }
            },
            provider: {
                select: {
                    name: true,
                    slug: true,
                    model_name: true,
                    model_slug: true
                }
            },
            user: {
                select: {
                    email: true,
                    username: true,
                    external_id: true
                }
            }
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
            slug: true,
            plays: true,
            stars: true,
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
                    model_slug: true
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
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
    metadata: Prisma.InputJsonValue
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
            user_id,
            metadata
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
    deleteOne,
}