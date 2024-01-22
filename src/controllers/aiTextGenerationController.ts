import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiTextGenerationService from "../services/aiTextGenerationService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGeneration(
            controllerUtils.getText(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post'),
        );

        res.status(200).json(response);
    } catch ({ response }: any) {
        res.status(400).json({ status: false, message: response.statusText });
    }
};

const textGenerationByPromptId = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGenerationByPromptId(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.response.statusText });
    }
};

const textGenerationByTemplateId = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGenerationByTemplateId(
            controllerUtils.getTemplateId(req, true, 'url'),
            controllerUtils.getText(req, true, 'post')
        );

        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.response.statusText });
    }
};

export default {
    textGeneration,
    textGenerationByPromptId,
    textGenerationByTemplateId
};