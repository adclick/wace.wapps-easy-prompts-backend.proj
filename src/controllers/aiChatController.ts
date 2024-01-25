import { Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import aiChatService from "../services/aiChatService";

const chat = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chat(
            controllerUtils.getText(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            controllerUtils.getChatHistory(req, true, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post'),
            controllerUtils.getTemplatesIds(req, true, 'post')
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const chatByPromptId = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chatByPromptId(
            controllerUtils.getPromptId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

export default {
    chat,
    chatByPromptId,
};