import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const upsertUser = async (email: string, external_id: string) => {
    return await prisma.users.upsert({
        where: { email },
        update: { external_id },
        create: { email, external_id }
    })
}

export const getRepositories = async (external_id: string) => {
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
    upsertUser,
    getRepositories
}