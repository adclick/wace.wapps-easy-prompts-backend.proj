import { Prisma, PrismaClient } from "@prisma/client";
import { TemplateParameter } from "./templateParameter";

const prisma = new PrismaClient();

export interface Template {
    id: number,
    content: string,
    type: string
}

export interface Modifier {
    content: string
}

const getOneById = async (id: number) => {
    return await prisma.template.findUnique({
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
            templates_modifiers: {
                include: {
                    modifier: true
                }
            },
            templates_parameters: {
                select: {
                    value: true,
                    parameter: true
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
        },
        include: {
            language: {
                select: {
                    name: true,
                    slug: true,
                }
            },
            repository: {
                select: {
                    name: true,
                    slug: true,
                }
            },
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
                    model_slug: true,
                    technology: true,
                    parameters: true
                },
            },
            user: {
                select: {
                    email: true,
                    username: true,
                    external_id: true
                }
            },
            templates_modifiers: {
                include: {
                    modifier: true
                }
            }
        }
    })
}

const getAll = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    limit: number,
    offset: number
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
            templates_parameters: {
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
            templates_modifiers: {
                include: {
                    modifier: {
                        select: {
                            id: true,
                            title: true,
                            slug: true
                        }
                    }
                }
            }
        },
        orderBy: [{ created_at: "desc" }],
        take: limit,
        skip: offset
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
    modifiersIds: number[],
    templateParameters: TemplateParameter[]
) => {
    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m }
    });

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
            templates_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
            templates_parameters: {
                createMany: {
                    data: templateParameters
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
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number,
) => {
    return await prisma.template.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            language_id,
            repository_id,
            technology_id,
            provider_id,
            user_id,
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
    updateOne,
    deleteOne,
}