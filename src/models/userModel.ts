import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getOneById = async (external_id: string) => {
    return await prisma.user.findUnique({
        where: {
            external_id
        }
    })
}

const getOneByEmailAndExternalId = async (email: string, external_id: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
            external_id,
        }
    })
}

const insertOne = async (external_id: string, email: string, username: string) => {
    return await prisma.user.create({
        data: {
            email,
            username,
            external_id
        },
    })
}

const upsertOne = async (email: string, username: string, external_id: string) => {
    return await prisma.user.upsert({
        where: { email },
        update: { username, external_id },
        create: { email, username, external_id }
    })
}

export default {
    getOneById,
    getOneByEmailAndExternalId,
    insertOne,
    upsertOne,
}