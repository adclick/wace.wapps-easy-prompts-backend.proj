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

const getOneByUUID = async (uuid: string) => await prisma.template.findUnique({ where: { uuid } });

const getAllByUUIDs = async (uuids: string[]) => {
    return await prisma.template.findMany({
        where: {
            uuid: { in: uuids }
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
            },
            templates_modifiers: {
                include: {
                    modifier: true
                }
            }
        }
    })
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
            },
            templates_modifiers: {
                include: {
                    modifier: true
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
            templates_parameters: {
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
            templates_modifiers: {
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
            }
        },
        orderBy: [{ created_at: "desc" }],
        take: limit,
        skip: offset
    });
}

const getAllByUser = async (
    external_id: string,
) => {
    return await prisma.template.findMany({
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
            templates_parameters: {
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
            templates_modifiers: {
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
            }
        },
        orderBy: [{ created_at: "desc" }],
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

    const parameters_ids = templateParameters.map(p => ({
        parameter_id: p.parameter_id,
        value: p.value
    }));

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
                    data: parameters_ids
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
    modifiersIds: number[],
) => {
    const modifiers_ids = modifiersIds.map(m => {
        return { modifier_id: m };
    });

    await prisma.templateModifier.deleteMany({
        where: {
            template_id: id
        }
    });

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
            templates_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
        },
    })
}

const deleteOne = async (id: number) => {
    return await prisma.template.delete({ where: { id } })
}

export default {
    getOneByUUID,
    getAllByUUIDs,
    getOneById,
    getAllByIds,
    getAllByUser,
    getAllByFilters,
    createOne,
    updateOne,
    deleteOne,
}