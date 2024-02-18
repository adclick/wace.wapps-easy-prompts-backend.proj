import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import workspaceService from "../services/workspaceService";

const getOneByUser = async (req: Request, res: Response) => {
    const response = await workspaceService.getOneWorkspaceByUser(
        controllerUtils.getUserExternalId(req, true, 'get'),
    );

    res.status(200).json(response);
};


export default {
    getOneByUser,
}