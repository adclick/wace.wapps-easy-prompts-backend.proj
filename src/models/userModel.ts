import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getOneById = async (external_id: string) => {
    return await prisma.user.findUnique({
        where: {
            external_id
        },
        include: {
            language: true,
            repositories: true,
            workspaces: true,
        }
    })
}

const upsertOne = async (email: string, username: string, external_id: string, language_id: number) => {
    return await prisma.user.upsert({
        where: { email },
        update: { username, external_id, language_id },
        create: { email, username, external_id, language_id },
        include: {
            language: true,
            repositories: true,
            workspaces: true,
        }
    })
}

export default {
    getOneById,
    upsertOne,
}