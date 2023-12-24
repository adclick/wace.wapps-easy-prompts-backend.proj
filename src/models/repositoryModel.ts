import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRepositoryBySlug = async (slug: string) => {
    return await prisma.repositories.findFirst({
        where: { slug }
    });
}

const upsertRepository = async (name: string, slug: string, user_id: number) => {
    return await prisma.repositories.upsert({
        where: {
            user_id_slug: { user_id, slug }
        },
        update: { name, slug, },
        create: { name, slug, user_id }
    })
}

const subscribeUser = async (repository_id: number, user_id: number) => {
    return await prisma.users_repositories.upsert({
        where: {
            user_id_repository_id: { repository_id, user_id }
        },
        update: { repository_id, user_id },
        create: { repository_id, user_id }
    });
}

const isUserInRepository = async (external_id: string, repository_id: number) => {
    return await prisma.repositories.findFirst({
        where: {
            OR: [
                {
                    users: {
                        external_id
                    }
                },
                {
                    users_repositories: {
                        some: {
                            repository_id,
                            users: {
                                external_id
                            }
                        }
                    }
                }
            ]
        }
    })
}

export default {
    getRepositoryBySlug,
    upsertRepository,
    subscribeUser,
    isUserInRepository
}