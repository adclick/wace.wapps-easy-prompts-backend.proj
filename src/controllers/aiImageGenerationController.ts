import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiImageGenerationService from "../services/aiImageGenerationService";

const imageGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiImageGenerationService.imageGeneration(
            controllerUtils.getText(req),
            controllerUtils.getProviderId(req),
            controllerUtils.getModifiersIds(req),
            controllerUtils.getTemplatesIds(req)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const imageGenerationByPromptId = async (req: Request, res: Response) => {
    try {
        const response = await aiImageGenerationService.imageGenerationByPromptId(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    imageGeneration,
    imageGenerationByPromptId,
};