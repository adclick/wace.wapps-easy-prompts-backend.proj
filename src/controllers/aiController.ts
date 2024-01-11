import { Request, Response } from "express";
import aiService, { Thread } from "../services/aiService";
import controllerUtils from "../utils/controllerUtils";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiService.textGeneration(
            controllerUtils.getText(req),
            controllerUtils.getProviderId(req),
            controllerUtils.getModifiersIds(req),
            controllerUtils.getPromptId(req, false),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const imageGeneration = async (req: Request, res: Response) => {
    try {
        const response = await aiService.imageGeneration(
            controllerUtils.getText(req),
            controllerUtils.getProviderId(req)
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const chat = async (req: Request, res: Response) => {
    try {
        const requests = (req.body.requests as Thread[]);

        const response = await aiService.chat(
            controllerUtils.getText(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            requests,
            controllerUtils.getPromptId(req, false, 'post')
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    textGeneration,
    imageGeneration,
    chat,
};