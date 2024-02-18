import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upsertOne = async (user_id: number, workspace_id: number) => {
    return await prisma.userWorkspace.upsert({
        where: {
            user_id_workspace_id: { user_id, workspace_id }
        },
        update: { user_id, workspace_id },
        create: { user_id, workspace_id }
    })
}

export default {
    upsertOne
}