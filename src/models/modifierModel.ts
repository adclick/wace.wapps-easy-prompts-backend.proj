import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getModifier = async (id: number) => {
    return await prisma.modifier.findUnique({
        where: {id},
    });
}

const getModifiers = async (
    external_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
) => {
    return await prisma.modifier.findMany({
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

const createModifier = async (
    user_id: number,
    name: string,
    slug: string,
    description: string,
    content: string,
    language_id: number,
    repository_id: number,
) => {
    return await prisma.modifier.create({
        data: {
            name,
            slug,
            description,
            content,
            language_id,
            repository_id,
            user_id
        },
    })
}

const deleteModifier = async (id: number) => {
    return await prisma.prompt.delete({
        where: { id }
    })
}

export default {
    getModifier,
    getModifiers,
    createModifier,
    deleteModifier,
}