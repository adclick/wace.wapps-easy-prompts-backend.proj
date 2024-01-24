import { Request, Response } from "express";
import technologyService from "../services/technologyService";
import controllerUtils from "../utils/controllerUtils";

const getTechnologies = async (req: Request, res: Response) => {
    try {
        const response = await technologyService.getTechnologies();

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const getDefault = async (req: Request, res: Response) => {
    try {
        const response = await technologyService.getDefault();

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    getTechnologies,
    getDefault,
};