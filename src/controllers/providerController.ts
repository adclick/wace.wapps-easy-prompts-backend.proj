import { Request, Response } from "express";
import providerService from "../services/providerService";
import controllerUtils from "../utils/controllerUtils";

const getDefault = async (req: Request, res: Response) => {
    const response = await providerService.getDefault(
        controllerUtils.getTechnologyId(req, true)
    );

    return res.status(200).json(response);
};

const getProviders = async (req: Request, res: Response) => {
    const response = await providerService.getProviders(
        controllerUtils.getTechnologyId(req, true)
    );

    return res.status(200).json(response);
};

export default {
    getDefault,
    getProviders
};