import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiChatService from "../services/aiChatService";

const chat = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chat(
            controllerUtils.getText(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            controllerUtils.getProvidersIds(req),
            controllerUtils.getChatHistory(req, true, 'post'),
            controllerUtils.getModifiersIds(req, false, 'post'),
        );

        res.status(200).json(response);
    } catch ({ response }: any) {
        res.status(400).json({ status: response.status, message: response.statusText });
    }
};

const chatById = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chatById(
            controllerUtils.getPromptId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    chat,
    chatById
};