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
        if ("status" in response && "statusText" in response) {
            res.status(400).json({ status: response.status, message: response.statusText });
        }
        
        console.error(response);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};

const chatByPromptId = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chatByPromptId(
            controllerUtils.getPromptId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const chatByTemplateId = async (req: Request, res: Response) => {
    try {
        const response = await aiChatService.chatByTemplateId(
            controllerUtils.getTemplateId(req, true, 'url'),
            controllerUtils.getText(req, true, 'post')
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    chat,
    chatByPromptId,
    chatByTemplateId
};