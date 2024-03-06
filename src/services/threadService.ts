import BadRequestError from "../errors/BadRequestError";
import modifierModel from "../models/modifierModel";
import providerModel from "../models/providerModel";
import technologyModel from "../models/technologyModel";
import templateModel from "../models/templateModel";
import threadChatMessageModel, { ThreadChatMessage } from "../models/threadChatMessageModel";
import threadChatMessageModifierModel from "../models/threadChatMessageModifierModel";
import threadModel from "../models/threadModel";
import { ThreadParameter } from "../models/threadParameter";
import userModel from "../models/userModel";
import workspaceModel from "../models/workspaceModel";
import textUtils from "../utils/textUtils";
import modifierService from "./modifierService";
import templateService from "./templateService";

const getAllThreadsByWorkspace = async (
    userExternalId: string,
    workspaceUUID: string
) => {
    const workspace = await workspaceModel.getOneByUUID(workspaceUUID);
    if (!workspace) throw new BadRequestError({ message: `Workspace "${workspaceUUID}" not found` });

    await validateUserForWorkspace(userExternalId, workspace.id);

    return await threadModel.getAllByWorkspace(workspace.id);
}

const createOneThread = async (
    title: string,
    key: string,
    content: string,
    response: string,
    userExternalId: string,
    workspaceUUID: string,
    technologyUUID: string,
    providerUUID: string,
    templatesUUIDs: string[],
    modifiersUUIDs: string[],
    threadChatMessages: ThreadChatMessage[],
    threadParameters: ThreadParameter[]
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    const workspace = await workspaceModel.getOneByUUID(workspaceUUID);
    if (!workspace) throw new BadRequestError({ message: `Workspace "${workspaceUUID}" not found` });

    await validateUserForWorkspace(userExternalId, workspace.id);

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new BadRequestError({ message: `Provider "${providerUUID}" not found` });

    const templates = await templateModel.getAllByUUIDs(templatesUUIDs);
    const modifiers = await modifierModel.getAllByUUIDs(modifiersUUIDs);

    const modifiersIds = modifiers.map(m => m.id);

    const thread = await threadModel.createOne(
        title,
        textUtils.toSlug(title),
        key,
        content,
        response,
        user.id,
        workspace.id,
        technology.id,
        provider.id,
        templates,
        modifiers,
        threadChatMessages,
        threadParameters,
    );

    for (const tcm of threadChatMessages) {
        await threadChatMessageModel.createOne(
            tcm.role,
            tcm.message,
            thread.id,
            user.id,
            modifiersIds
        );
    }


    return thread;
}

const updateOneThread = async (
    uuid: string,
    title: string,
    key: string,
    content: string,
    response: string,
    collapsed: boolean,
    userExternalId: string,
    workspaceUUID: string,
    technologyUUID: string,
    providerUUID: string,
    templatesUUIDs: string[],
    modifiersUUIDs: string[],
    chatMessages: ThreadChatMessage[],
) => {
    const user = await userModel.getOneById(userExternalId);
    if (!user) throw new Error("User not found");

    const thread = await threadModel.getOneByUUID(uuid);
    if (!thread) throw new BadRequestError({ message: `Thread "${uuid}" not found` });

    const workspace = await workspaceModel.getOneByUUID(workspaceUUID);
    if (!workspace) throw new BadRequestError({ message: `Workspace "${workspaceUUID}" not found` });

    await validateUserForWorkspace(userExternalId, workspace.id);

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new BadRequestError({ message: `Provider "${providerUUID}" not found` });

    const templates = await templateModel.getAllByUUIDs(templatesUUIDs);
    const modifiers = await modifierModel.getAllByUUIDs(modifiersUUIDs);

    const modifiersIds = modifiers.map(m => m.id);

    const threadChatMessages = chatMessages.slice(-2);

    const threadUpdated = await threadModel.updateOne(
        thread.id,
        title,
        textUtils.toSlug(title),
        key,
        content,
        response,
        collapsed,
        user.id,
        workspace.id,
        technology.id,
        provider.id,
        templates,
        modifiers,
        threadChatMessages,
    );

    threadChatMessages.forEach(async tcm => {
        console.log(modifiersIds);
        await threadChatMessageModel.createOne(
            tcm.role,
            tcm.message,
            threadUpdated.id,
            user.id,
            modifiersIds
        );
    })

    return threadUpdated;
}

const deleteOneThread = async (userExternalId: string, threadUUID: string) => {
    const thread = await threadModel.getOneByUUID(threadUUID);
    if (!thread) throw new BadRequestError({ message: `Thread "${threadUUID}" not found` });

    if (thread.user.external_id !== userExternalId) {
        throw new BadRequestError({ message: "Permission denied for the given workspace" });
    }

    return await threadModel.deleteOne(thread.id);
}

const deleteAllThreadsByWorkspaceId = async (userExternalId: string, workspaceUUID: string) => {
    const workspace = await workspaceModel.getOneByUUID(workspaceUUID);
    if (!workspace) throw new BadRequestError({ message: `Workspace "${workspaceUUID}" not found` });

    await validateUserForWorkspace(userExternalId, workspace.id);

    return await threadModel.deleteAllByWorkspaceId(workspace.id);
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