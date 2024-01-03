import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getUser = async (external_id: string) => {
    return await prisma.user.findUnique({
        where: {
            external_id
        }
    })
}

const upsertUser = async (email: string, username: string, external_id: string) => {
    return await prisma.user.upsert({
        where: { email },
        update: { username, external_id },
        create: { email, username, external_id }
    })
}

const getRepositories = async (external_id: string) => {
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

export default {
    getUser,
    upsertUser,
    getRepositories
}