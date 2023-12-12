import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserRepositories = async (userId: string) => {
    return await prisma.repositories.findMany({
        where: {
            users: {
                auth0_id: userId
            }
        }
    })
}

module.exports = {
    getUserRepositories
}