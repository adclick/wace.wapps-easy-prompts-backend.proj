import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiTextGenerationService from "../services/aiTextGenerationService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGeneration(
            controllerUtils.getText(req),
            controllerUtils.getProviderId(req),
            controllerUtils.getProvidersIds(req),
            controllerUtils.getModifiersIds(req),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const textGenerationById = async (req: Request, res: Response) => {
    try {
        const response = await aiTextGenerationService.textGenerationById(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    textGeneration,
    textGenerationById,
};