import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const upsertUser = async (id: string, email: string) => {
    return await prisma.users.upsert({
        where: { id },
        update: { email },
        create: { id, email }
    })
}

export default {
    upsertUser
}