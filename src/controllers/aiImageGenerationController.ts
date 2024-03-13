import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiImageGenerationService from "../services/aiImageGenerationService";

const imageGeneration = async (req: Request, res: Response) => {
    const response = await aiImageGenerationService.imageGeneration(
        controllerUtils.getText(req),
        controllerUtils.getProviderId(req),
        controllerUtils.getModifiersIds(req),
        controllerUtils.getTemplatesIds(req),
        controllerUtils.getParameterNumImages(req),
        controllerUtils.getParameterImageResolution(req)
    );

    return res.status(200).json(response);
};

const imageGenerationByPromptId = async (req: Request, res: Response) => {
    const response = await aiImageGenerationService.imageGenerationByPromptId(
        controllerUtils.getPromptId(req, true, 'url'),
    );

    return res.status(200).json(response);
};

export default {
    imageGeneration,
    imageGenerationByPromptId,
};