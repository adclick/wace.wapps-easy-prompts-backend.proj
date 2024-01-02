import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getUser = async (external_id: string) => {
    return await prisma.users.findUnique({
        where: {
            external_id
        }
    })
}

const upsertUser = async (email: string, username: string, external_id: string) => {
    return await prisma.users.upsert({
        where: { email },
        update: { username, external_id },
        create: { email, username, external_id }
    })
}

const getRepositories = async (external_id: string) => {
    return await prisma.repositories.findMany({
        where: {
            OR: [
                {
                    users: { external_id }
                },
                {
                    users_repositories: {
                        some: {
                            users: { external_id }
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