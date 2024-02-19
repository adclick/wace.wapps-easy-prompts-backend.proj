import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import workspaceService from "../services/workspaceService";

const getAllByUser = async (req: Request, res: Response) => {
    const response = await workspaceService.getAllWorkspacesByUser(
        controllerUtils.getUserExternalId(req, true, 'get'),
    );

    return res.status(200).json(response);
};


export default {
    getAllByUser,
}