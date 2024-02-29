import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Modifier {
    content: string,
}

const getOneByUUID = async (uuid: string) => await prisma.modifier.findUnique({ where: { uuid } });

const getAllByUUIDs = async (uuids: string[]) => {
    return await prisma.modifier.findMany({
        where: {
            uuid: { in: uuids }
        }
    })
}

const getOneById = async (id: number) => {
    return await prisma.modifier.findUnique({
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
            user: true
        }
    });
}

const getAllByIds = async (ids: number[]) => {
    return await prisma.modifier.findMany({
        where: {
            id: {
                in: ids
            }
        },
        include: {
            language: {
                select: {
                    uuid: true,
                    name: true,
                    slug: true,
                }
            },
            repository: {
                select: {
                    uuid: true,
                    name: true,
                    slug: true,
                }
            },
            technology: {
                select: {
                    uuid: true,
                    name: true,
                    slug: true,
                    default: true
                }
            },
            provider: {
                select: {
                    uuid: true,
                    name: true,
                    slug: true,
                    model_name: true,
                    model_slug: true,
                    technology: true,
                    parameters: true
                },
            },
            user: {
                select: {
                    uuid: true,
                    email: true,
                    username: true,
                    external_id: true
                }
            }
        }
    })
}

const getAllByFilters = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    limit: number,
    offset: number
) => {
    return await prisma.modifier.findMany({
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
            technology: { id: { in: technologies_ids } },
        },
        include: {
            user: {
                select: {
                    uuid: true,
                    external_id: true,
                    email: true,
                    username: true,
                }
            },
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
        },
        orderBy: [{ created_at: "desc" }],
        take: limit,
        skip: offset
    });
}

const getAllByUser = async (
    external_id: string,
) => {
    return await prisma.modifier.findMany({
        where: {
            repository: {
                OR: [
                    {
                        users_repositories: {
                            some: {
                                user: { external_id },
                            }
                        }
                    },
                    {
                        user: { external_id },
                    }
                ]
            },
        },
        include: {
            user: {
                select: {
                    external_id: true,
                    uuid: true,
                    email: true,
                    username: true,
                }
            },
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
        },
        orderBy: [{ created_at: "desc" }],
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
    provider_id: number
) => {
    return await prisma.modifier.create({
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
    provider_id: number
) => {
    return await prisma.modifier.update({
        where: {id},
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

const deleteOne = async (id: number) => {
    return await prisma.modifier.delete({ where: { id } })
}

export default {
    getOneByUUID,
    getAllByUUIDs,
    getOneById,
    getAllByIds,
    getAllByFilters,
    getAllByUser,
    createOne,
    updateOne,
    deleteOne,
}