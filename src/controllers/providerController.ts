import { Request, Response } from "express";
import providerService from "../services/providerService";
import controllerUtils from "../utils/controllerUtils";

const getDefault = async (req: Request, res: Response) => {
    try {
        const response = await providerService.getDefault(
            controllerUtils.getTechnologyId(req, true)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const getProviders = async (req: Request, res: Response) => {
    try {
        const response = await providerService.getProviders(
            controllerUtils.getTechnologyId(req, true)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    getDefault,
    getProviders
};