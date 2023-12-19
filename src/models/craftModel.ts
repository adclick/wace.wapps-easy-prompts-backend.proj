import { PrismaClient } from "@prisma/client";
import { CRAFT_TYPE } from "@prisma/client";

const prisma = new PrismaClient();

const getTypes = async () => {
    return await prisma.crafts.findMany({
        distinct: ["type"],
        select: { type: true }
    });
}

const getCrafts = async (
    user_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    crafts_types: CRAFT_TYPE[]
) => {
    return await prisma.crafts.findMany({
        where: {
            content: {
                contains: search_term
            },
            languages: {
                id: {
                    in: languages_ids
                }
            },
            repositories: {
                OR: [
                    {
                        users_repositories: {
                            some: {
                                user_id,
                                repository_id: {
                                    in: repositories_ids
                                }
                            }
                        }
                    },
                    {
                        user_id,
                        id: {
                            in: repositories_ids
                        }
                    }
                ]
            },
            technologies: {
                id: {
                    in: technologies_ids
                }
            },
            type: {
                in: crafts_types
            }
        },
        include: {
            users: {
                select: {
                    id: true,
                    email: true
                }
            },
            languages: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            repositories: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            technologies: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            crafted_by: {
                select: {
                    crafting: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            description: true,
                            content: true,
                            score: true,
                            created_at: true,
                            type: true,
                            users: {
                                select: {
                                    id: true,
                                    email: true,
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: [
            {
                created_at: "desc"
            }
        ]
    });
}

const createCraft = async (
    user_id: string,
    name: string,
    slug: string,
    description: string,
    content: string,
    created_at: Date,
    type: CRAFT_TYPE,
    language_id: number,
    repository_id: number,
    technology_id: number,
    crafting_ids: number[] = [],
    provider_id: number | null = null,
) => {
    const data = crafting_ids.map(id => {
        return {
            crafting_id: id
        }
    })

    return await prisma.crafts.create({
        data: {
            user_id,
            name,
            slug,
            description,
            content,
            created_at,
            language_id,
            repository_id,
            technology_id,
            provider_id,
            type,
            crafted_by: {
                createMany: { data }
            }
        }
    })
}

export default {
    getTypes,
    getCrafts,
    createCraft
}