import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiTextGenerationService from "../services/aiTextGenerationService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGeneration(
            controllerUtils.getText(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post'),
            controllerUtils.getTemplatesIds(req, true, 'post'),

        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const textGenerationByPromptId = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGenerationByPromptId(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    textGeneration,
    textGenerationByPromptId,
};