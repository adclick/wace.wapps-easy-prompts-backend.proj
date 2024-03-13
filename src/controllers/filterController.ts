import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import filterService from "../services/filterService";

const getAll = async (req: Request, res: Response) => {
    const response = await filterService.getAll(
        controllerUtils.getUserExternalId(req, true)
    );

    return res.status(200).json(response);
};

const getAllUserPrivateFilters = async (req: Request, res: Response) => {
    const response = await filterService.getAllUserPrivateFilters(
        controllerUtils.getUserExternalId(req, true)
    );

    return res.status(200).json(response);
}

const getAllUserPublicDatabaseFilters = async (req: Request, res: Response) => {
    const response = await filterService.getAllUserPublicDatabaseFilters(
        controllerUtils.getUserExternalId(req, true)
    );

    return res.status(200).json(response);
};

export default {
    getAll,
    getAllUserPrivateFilters,
    getAllUserPublicDatabaseFilters
};