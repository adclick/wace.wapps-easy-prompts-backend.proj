import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllByWorkspace = async (workspace_id: number) => {
    return await prisma.thread.findMany({
        where: { workspace_id }
    });
}

const createOne = async (
    title: string,
    user_id: number,
    prompt_id: number,
    workspace_id: number,
    response: string
) => {
    return await prisma.thread.create({
        data: { 
            title,
            user_id,
            prompt_id,
            workspace_id,
            response
         }
    });
}


export default {
    getAllByWorkspace,
    createOne
}