import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiTextGenerationService from "../services/aiTextGenerationService";

const textGeneration = async (req: Request, res: Response) => {
    const response = await aiTextGenerationService.textGeneration(
        controllerUtils.getText(req, true, 'post'),
        controllerUtils.getProviderId(req, true, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getTemplatesIds(req, true, 'post'),

    );

    return res.status(200).json(response);
};

const textGenerationByPromptId = async (req: Request, res: Response) => {
    const response = await aiTextGenerationService.textGenerationByPromptId(
        controllerUtils.getPromptId(req, true, 'url'),
    );

    return res.status(200).json(response);
};

export default {
    textGeneration,
    textGenerationByPromptId,
};