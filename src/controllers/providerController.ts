import { Request, Response } from "express";
import providerService from "../services/providerService";
import controllerUtils from "../utils/controllerUtils";

const getDefault = async (req: Request, res: Response) => {
    try {
        const response = await providerService.getDefault(
            controllerUtils.getTechnologyId(req, true)
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const getProviders = async (req: Request, res: Response) => {
    try {
        const response = await providerService.getProviders(
            controllerUtils.getTechnologyId(req, true)
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    getDefault,
    getProviders
};