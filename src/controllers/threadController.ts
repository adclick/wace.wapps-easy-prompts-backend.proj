import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import threadService from "../services/threadService";

const getAllThreadsByWorkspace = async (req: Request, res: Response) => {
    const response = await threadService.getAllThreadsByWorkspace(
        controllerUtils.getUserExternalId(req, true, 'get'),
        controllerUtils.getWorkspaceId(req, true, 'get'),
    );

    return res.status(200).json(response);
};

const createOneThread = async (req: Request, res: Response) => {
    const response = await threadService.createOneThread(
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getKey(req, true, 'post'),
        controllerUtils.getContent(req, true, 'post'),
        controllerUtils.getResponse(req, true, 'post'),
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, true, 'post'),
        controllerUtils.getTemplatesIds(req, true, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getChatMessages(req, true, 'post'),
        controllerUtils.getThreadParameters(req, true, 'post'),
    );

    return res.status(201).json(response);
};

const updateOneThread = async (req: Request, res: Response) => {
    const response = await threadService.updateOneThread(
        controllerUtils.getThreadId(req, true, 'url'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getKey(req, true, 'post'),
        controllerUtils.getContent(req, true, 'post'),
        controllerUtils.getResponse(req, false, 'post'),
        controllerUtils.getCollapsed(req, true, 'post'),
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, true, 'post'),
        controllerUtils.getTemplatesIds(req, true, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getChatMessages(req, true, 'post'),
    );

    return res.status(200).json(response);
};

const deleteOnethread = async (req: Request, res: Response) => {
    const response = await threadService.deleteOneThread(
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getThreadId(req, true, 'url'),
    );

    return res.status(200).json(response);
}

const deleteAllThreadsByWorkspaceId = async (req: Request, res: Response) => {
    const response = await threadService.deleteAllThreadsByWorkspaceId(
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post')
    );

    return res.status(200).json(response);
}

export default {
    getAllThreadsByWorkspace,
    createOneThread,
    updateOneThread,
    deleteOnethread,
    deleteAllThreadsByWorkspaceId
}