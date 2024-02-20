import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import threadService from "../services/threadService";

const getAllThreadsByWorkspace = async (req: Request, res: Response) => {
    const response = await threadService.getAllThreadsByWorkspace(
        controllerUtils.getWorkspaceId(req, true, 'get'),
    );

    return res.status(200).json(response);
};

const createOneThread = async (req: Request, res: Response) => {
    const response = await threadService.createOneThread(
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getResponse(req, false, 'post'),
        controllerUtils.getPromptId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post'),
        controllerUtils.getKey(req, true, 'post'),
        controllerUtils.getUserExternalId(req, true, 'post')
    );

    return res.status(201).json(response);
};

const updateOneThread = async (req: Request, res: Response) => {
    const response = await threadService.updateOneThread(
        controllerUtils.getThreadId(req, true, 'url'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getResponse(req, false, 'post'),
        controllerUtils.getPromptId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post'),
        controllerUtils.getKey(req, true, 'post'),
        controllerUtils.getUserExternalId(req, true, 'post')
    );

    return res.status(201).json(response);
};

const deleteOnethread = async (req: Request, res: Response) => {
    const response = await threadService.deleteOneThread(
        controllerUtils.getThreadId(req, true, 'url')
    );

    return res.status(200).json(response);
}

export default {
    getAllThreadsByWorkspace,
    createOneThread,
    updateOneThread,
    deleteOnethread
}