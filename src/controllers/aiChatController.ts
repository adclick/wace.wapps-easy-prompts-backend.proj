import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiChatService from "../services/aiChatService";

const chat = async (req: Request, res: Response) => {
    const response = await aiChatService.chat(
        controllerUtils.getText(req, true, 'post'),
        controllerUtils.getProviderId(req, true, 'post'),
        controllerUtils.getChatMessages(req, true, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getTemplatesIds(req, true, 'post')
    );

    return res.status(200).json(response);
};

const chatByPromptId = async (req: Request, res: Response) => {
    const response = await aiChatService.chatByPromptId(
        controllerUtils.getPromptId(req, true, 'url')
    );

    return res.status(200).json(response);
};

export default {
    chat,
    chatByPromptId,
};