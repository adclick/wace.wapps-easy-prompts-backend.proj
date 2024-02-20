import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.thread.findUnique({
        where: { id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: true,
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const getAllByWorkspace = async (workspace_id: number) => {
    return await prisma.thread.findMany({
        where: { workspace_id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: true,
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const createOne = async (
    title: string,
    slug: string,
    key: string,
    content: string,
    response: string,
    user_id: number,
    workspace_id: number,
    technology_id: number,
    provider_id: number,
) => {
    return await prisma.thread.create({
        data: {
            title,
            slug,
            key,
            content,
            response,
            user_id,
            workspace_id,
            technology_id,
            provider_id,
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