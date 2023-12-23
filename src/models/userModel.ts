import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getUser = async (auth0_id: string) {
    return await prisma.users.findUnique({
        where: {
            auth0_id
        }
    })
}

const upsertUser = async (id: number, email: string, auth0_id: string) => {
    return await prisma.users.upsert({
        where: { id },
        update: { email },
        create: { email, auth0_id }
    })
}

export default {
    getUser,
    upsertUser
}