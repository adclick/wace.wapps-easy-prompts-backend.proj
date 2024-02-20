import { ThreadChatMessage } from "../models/threadChatMessageModel";
import threadModel from "../models/threadModel";
import { ThreadParameter } from "../models/threadParameter";
import userModel from "../models/userModel";
import textUtils from "../utils/textUtils";

const getAllThreadsByWorkspace = async (workspace_id: number) => {
    return await threadModel.getAllByWorkspace(workspace_id);
}

const createOneThread = async (
    title: string,
    key: string,
    content: string,
    response: string,
    userExternalId: string,
    workspaceId: number,
    technologyId: number,
    providerId: number,
    templatesIds: number[],
    modifiersIds: number[],
    threadChatMessages: ThreadChatMessage[],
    threadParameters: ThreadParameter[]
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    return await threadModel.createOne(
        title,
        textUtils.toSlug(title),
        key,
        content,
        response,
        user.id,
        workspaceId,
        technologyId,
        providerId,
        templatesIds,
        modifiersIds,
        threadChatMessages,
        threadParameters,
    );
}

const updateOneThread = async (
    id: number,
    title: string,
    key: string,
    content: string,
    response: string,
    userExternalId: string,
    workspaceId: number,
    technologyId: number,
    providerId: number,
    templatedsIds: number[],
    modifiersIds: number[],
    threadChatMessages: ThreadChatMessage[],
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    return await threadModel.updateOne(
        id,
        title,
        textUtils.toSlug(title),
        key,
        content,
        response,
        user.id,
        workspaceId,
        technologyId,
        providerId,
        templatedsIds,
        modifiersIds,
        threadChatMessages,
    );
}


const deleteOneThread = async (id: number) => {
    return await threadModel.deleteOne(id);
}

const deleteAllThreadsByWorkspaceId = async (workspaceId: number) => {
    return await threadModel.deleteAllByWorkspaceId(workspaceId);
}


export default {
    getAllThreadsByWorkspace,
    createOneThread,
    updateOneThread,
    deleteOneThread,
    deleteAllThreadsByWorkspaceId
}