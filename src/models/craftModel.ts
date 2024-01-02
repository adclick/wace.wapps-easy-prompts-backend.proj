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
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    crafts_types: CRAFT_TYPE[]
) => {
    return await prisma.crafts.findMany({
        where: {
            OR: [
                { name: { startsWith: search_term, mode: "insensitive" } },
                { name: { endsWith: search_term, mode: "insensitive" } },
                { name: { contains: search_term, mode: "insensitive" } },
                { description: { startsWith: search_term, mode: "insensitive" } },
                { description: { endsWith: search_term, mode: "insensitive" } },
                { description: { contains: search_term, mode: "insensitive" } },
                { content: { startsWith: search_term, mode: "insensitive" } },
                { content: { endsWith: search_term, mode: "insensitive" } },
                { content: { contains: search_term, mode: "insensitive" } },
            ],
            languages: { id: { in: languages_ids } },
            repositories: {
                OR: [
                    {
                        users_repositories: {
                            some: {
                                users: { external_id },
                                repository_id: {
                                    in: repositories_ids
                                }
                            }
                        }
                    },
                    {
                        users: { external_id },
                        id: {
                            in: repositories_ids
                        }
                    }
                ]
            },
            technologies: { id: { in: technologies_ids } },
            type: { in: crafts_types }
        },
        include: {
            users: {
                select: {
                    id: true,
                    email: true,
                    username: true,
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
        },
        orderBy: [{ created_at: "desc" }]
    });
}

const createCraft = async (
    user_id: number,
    name: string,
    slug: string,
    description: string,
    content: string,
    created_at: Date,
    type: CRAFT_TYPE,
    language_id: number,
    repository_id: number,
    technology_id: number,
    provider_id: number | null = null,
) => {
    return await prisma.crafts.create({
        data: {
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
            user_id
        },
    })
}

const deleteCraft = async (id: number) => {
    return await prisma.crafts.delete({
        where: { id }
    })
}

export default {
    getTypes,
    getCrafts,
    createCraft,
    deleteCraft
}