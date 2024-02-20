import { PromptStatus } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import promptModel from "../models/promptModel";
import threadModel from "../models/threadModel";
import userModel from "../models/userModel";

const getAllThreadsByWorkspace = async (workspace_id: number) => {
    return await threadModel.getAllByWorkspace(workspace_id);
}

const createOneThread = async (
    title: string,
    response: string,
    promptId: number,
    workspaceId: number,
    key: string,
    userExternalId: string
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    const thread = await threadModel.createOne(
        title,
        response,
        promptId,
        workspaceId,
        key,
        user.id
    );

    console.log(thread);
    return thread;
}

const updateOneThread = async (
    id: number,
    title: string,
    response: string,
    promptId: number,
    workspaceId: number,
    key: string,
    userExternalId: string
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    const thread = await threadModel.updateOne(
        id,
        title,
        response,
        promptId,
        workspaceId,
        key,
        user.id
    );

    console.log(thread);
    return thread;
}


const deleteOneThread = async (id: number) => {
    const thread = await threadModel.getOneById(id);
    if (!thread) throw new BadRequestError({message: 'Thread not found'});

    await threadModel.deleteOne(id);


    const prompt = thread.prompt;
    if (prompt.status === PromptStatus.DRAFT) {
        await promptModel.deleteOne(prompt.id);
    }
}

export default {
    getAllThreadsByWorkspace,
    createOneThread,
    updateOneThread,
    deleteOneThread
}