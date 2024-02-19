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
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getPromptId(req, true, 'post'),
        controllerUtils.getWorkspaceId(req, true, 'post'),
        controllerUtils.getResponse(req, true, 'post'),
    );

    return res.status(201).json(response);
};

export default {
    getAllThreadsByWorkspace,
    createOneThread
}