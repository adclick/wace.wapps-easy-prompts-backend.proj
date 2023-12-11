import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getUser = async (auth0Id: string) => {
    return await prisma.users.findUnique({
        where: {
            auth0_id: auth0Id
        }
    })
}

module.exports = {
    getUser
}