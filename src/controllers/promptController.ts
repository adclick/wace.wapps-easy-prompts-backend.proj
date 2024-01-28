import { Request, Response } from "express";
import promptService from "../services/promptService";
import controllerUtils from "../utils/controllerUtils";

const getPrompts = async (req: Request, res: Response) => {
    try {
        const response = await promptService.getPrompts(
            controllerUtils.getUserExternalId(req, true),
            controllerUtils.getSearchTerm(req, false),
            controllerUtils.getLanguagesIds(req),
            controllerUtils.getRepositoriesIds(req),
            controllerUtils.getTechnologiesIds(req),
            controllerUtils.getLimit(req, true),
            controllerUtils.getOffset(req, true)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const getPromptById = async (req: Request, res: Response) => {
    try {
        const response = await promptService.getPromptById(
            controllerUtils.getPromptId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const createPrompt = async (req: Request, res: Response) => {
    try {
        const response = await promptService.createPrompt(
            controllerUtils.getUserExternalId(req, true, 'post'),
            controllerUtils.getTitle(req, true, 'post'),
            controllerUtils.getDescription(req, true, 'post'),
            controllerUtils.getContent(req, true, 'post'),
            controllerUtils.getLanguageId(req, true, 'post'),
            controllerUtils.getRepositoryId(req, true, 'post'),
            controllerUtils.getTechnologyId(req, true, 'post'),
            controllerUtils.getProviderId(req, false, 'post'),
            controllerUtils.getTemplatesIds(req, true, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post'),
            controllerUtils.getChatMessages(req, false, 'post')
        );

        res.status(201).json(response);
    } catch (error: any) {
        console.error(error);
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

const deletePrompt = async (req: Request, res: Response) => {
    try {
        const response = await promptService.deletePrompt(
            controllerUtils.getPromptId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

export default {
    getPrompts,
    getPromptById,
    createPrompt,
    deletePrompt
};