import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneBySlug = async (slug: string) => {
    return await prisma.repository.findFirst({
        where: { slug }
    });
}

const upsertOne = async (name: string, slug: string, user_id: number) => {
    return await prisma.repository.upsert({
        where: {
            user_id_slug: { user_id, slug }
        },
        update: { name, slug, },
        create: { name, slug, user_id }
    })
}

const getAllByUser = async (external_id: string) => {
    return await prisma.repository.findMany({
        where: {
            OR: [
                {
                    user: { external_id }
                },
                {
                    users_repositories: {
                        some: {
                            user: { external_id }
                        }
                    }
                }
            ]
        }
    })
}

const getOneByUserAndRepository = async (external_id: string, repository_id: number) => {
    return await prisma.repository.findFirst({
        where: {
            OR: [
                {
                    user: {
                        external_id
                    }
                },
                {
                    users_repositories: {
                        some: {
                            repository_id,
                            user: {
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
    getOneBySlug,
    upsertOne,
    getAllByUser,
    getOneByUserAndRepository
}