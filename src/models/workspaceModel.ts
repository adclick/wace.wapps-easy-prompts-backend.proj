import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upsertOne = async (name: string, slug: string, user_id: number) => {
    return await prisma.workspace.upsert({
        where: {
            user_id_slug: { user_id, slug }
        },
        update: { name, },
        create: { name, slug, user_id }
    })
}

const getAllByUser = async (external_id: string) => {
    return await prisma.workspace.findMany({
        where: {
            OR: [
                {
                    user: { external_id }
                },
                {
                    users_workspaces: {
                        every: {
                            user: { external_id }
                        }
                    }
                }
            ]
        }
    })
}


export default {
    upsertOne,
    getAllByUser
}