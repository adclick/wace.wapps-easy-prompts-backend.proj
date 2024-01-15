import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiImageGenerationService from "../services/aiImageGenerationService";

const imageGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiImageGenerationService.imageGeneration(
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

const imageGenerationById = async (req: Request, res: Response) => {
    try {
        const response = await aiImageGenerationService.imageGenerationById(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    imageGeneration,
    imageGenerationById,
};