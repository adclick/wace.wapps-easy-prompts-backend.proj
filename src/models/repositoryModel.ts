import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserRepositories = async (user_id: string) => {
    return await prisma.repositories.findMany({
        where: {
            OR: [
                {
                    user_id
                },
                {
                    users_repositories: {
                        some: {
                            user_id
                        }
                    }
                }
            ]
        }
    })
}

export default {
    getUserRepositories
}