import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upsertRepository = async (name: string, slug: string, user_id: number) => {
}

const getUserRepositories = async (user_id: string) => {
    return await prisma.repositories.findMany({
        where: {
            OR: [
                {
                    user_id
                },
                {
                    users_repositories: {
                        some: {
                            user_id
                        }
                    }
                }
            ]
        }
    })
}

const isUserInRepository = async (user_id: string, repository_id: number) => {
    return await prisma.repositories.findFirst({
        where: {
            OR: [
                {
                    user_id
                },
                {
                    users_repositories: {
                        some: {
                            repository_id, user_id
                        }
                    }
                }
            ]
        }
    })
}

const getRepositoryBySlug = async (slug: string) => {
    return await prisma.repositories.findFirst({
        where: { slug }
    });
}

const addUser = async (repository_id: number, user_id: string) => {
    return await prisma.users_repositories.upsert({
        where: {
            user_id_repository_id: {
                repository_id,
                user_id
            }
        },
        update: { repository_id, user_id },
        create: { repository_id, user_id }
    });
}

export default {
    upsertRepository,
    getUserRepositories,
    isUserInRepository,
    getRepositoryBySlug,
    addUser
}