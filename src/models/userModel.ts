import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const upsertUser = async (auth0_id: string, email: string) => {
    return await prisma.users.upsert({
        where: { auth0_id },
        update: { email },
        create: { auth0_id, email }
    })
}

export default {
    upsertUser
}