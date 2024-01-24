import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import filterService from "../services/filterService";

const getAll = async (req: Request, res: Response) => {
    try {
        const response = await filterService.getAll(
            controllerUtils.getUserExternalId(req, true)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    getAll,
};