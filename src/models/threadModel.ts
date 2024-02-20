import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.thread.findUnique({
        where: { id },
        include: {
            prompt: true
        }
    });
}

const getAllByWorkspace = async (workspace_id: number) => {
    return await prisma.thread.findMany({
        where: { workspace_id },
        include: {
            prompt: {
                include: {
                    user: true,
                    language: true,
                    technology: true,
                    provider: true,
                    repository: true,
                    prompts_chat_messages: true,
                    prompts_templates: true,
                    prompts_modifiers: true,
                    prompts_parameters: true,
                }
            },
            user: true,
            workspace: true
        }
    });
}

const createOne = async (
    title: string,
    response: string,
    prompt_id: number,
    workspace_id: number,
    key: string,
    user_id: number
) => {
    return await prisma.thread.create({
        data: {
            title,
            prompt_id,
            workspace_id,
            response,
            key,
            user_id
        }
    });
}

const updateOne = async (
    id: number,
    title: string,
    response: string,
    prompt_id: number,
    workspace_id: number,
    key: string,
    user_id: number
) => {
    return await prisma.thread.update({
        where: { id },
        data: {
            title,
            prompt_id,
            workspace_id,
            response,
            key,
            user_id
        }
    });
}



const deleteOne = async (id: number) => {
    return await prisma.thread.delete({
        where: { id }
    })
}


export default {
    getOneById,
    getAllByWorkspace,
    createOne,
    updateOne,
    deleteOne
}