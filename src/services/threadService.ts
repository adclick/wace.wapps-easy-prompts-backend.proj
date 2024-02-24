import BadRequestError from "../errors/BadRequestError";
import { ThreadChatMessage } from "../models/threadChatMessageModel";
import threadModel from "../models/threadModel";
import { ThreadParameter } from "../models/threadParameter";
import userModel from "../models/userModel";
import workspaceModel from "../models/workspaceModel";
import textUtils from "../utils/textUtils";

const getAllThreadsByWorkspace = async (
    userExternalId: string,
    workspace_id: number
) => {
    await validateUserForWorkspace(userExternalId, workspace_id);

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

    await validateUserForWorkspace(userExternalId, workspaceId);

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
    chatMessages: ThreadChatMessage[],
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    await validateUserForWorkspace(userExternalId, workspaceId);

    const threadChatMessages = chatMessages.map(cm => {
        return {
            role: cm.role,
            message: cm.message
        }
    })

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

const deleteOneThread = async (userExternalId: string, threadId: number) => {
    const thread = await threadModel.getOneById(threadId);

    if (!thread) {
        throw new BadRequestError({ message: "Thread not found" });
    }

    if (thread.user.external_id !== userExternalId) {
        throw new BadRequestError({ message: "Permission denied for the given workspace" });
    }

    return await threadModel.deleteOne(threadId);
}

const deleteAllThreadsByWorkspaceId = async (userExternalId: string, workspaceId: number) => {
    await validateUserForWorkspace(userExternalId, workspaceId);

    return await threadModel.deleteAllByWorkspaceId(workspaceId);
}

const validateUserForWorkspace = async (userExternalId: string, workspaceId: number) => {
    const userWorkspaces = await workspaceModel.getAllByUser(userExternalId);

    const hasWorkspace = userWorkspaces.find(w => w.id === workspaceId);

    if (!hasWorkspace) throw new BadRequestError({ message: "Permission denied for the given workspace" });
}


export default {
    getAllThreadsByWorkspace,
    createOneThread,
    updateOneThread,
    deleteOneThread,
    deleteAllThreadsByWorkspaceId
}