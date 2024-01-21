import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Template {
    id: number,
    content: string,
    type: string
}

const getOneById = async (id: number) => {
    return await prisma.template.findUnique({
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

const getAllByIds = async (ids: number[]) => {
    return await prisma.template.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
}

const getAll = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
) => {
    return await prisma.template.findMany({
        where: {
            OR: [
                { title: { startsWith: search_term, mode: "insensitive" } },
                { title: { endsWith: search_term, mode: "insensitive" } },
                { title: { contains: search_term, mode: "insensitive" } },
                { description: { startsWith: search_term, mode: "insensitive" } },
                { description: { endsWith: search_term, mode: "insensitive" } },
                { description: { contains: search_term, mode: "insensitive" } },
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
        },
        orderBy: [{ created_at: "desc" }]
    });
}

const createOne = async (
    user_id: number,
    title: string,
    slug: string,
    description: string,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
    metadata: Prisma.InputJsonValue
) => {
    return await prisma.template.create({
        data: {
            title,
            slug,
            description,
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
    return await prisma.template.delete({ where: { id } })
}

export default {
    getOneById,
    getAllByIds,
    getAll,
    createOne,
    deleteOne,
}