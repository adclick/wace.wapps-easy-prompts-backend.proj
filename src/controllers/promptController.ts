import { Request, Response } from "express";
import promptService from "../services/promptService";
import controllerUtils from "../utils/controllerUtils";

const getPrompts = async (req: Request, res: Response) => {
    const response = await promptService.getPrompts(
        controllerUtils.getUserExternalId(req, true),
        controllerUtils.getSearchTerm(req, false),
        controllerUtils.getLanguagesIds(req),
        controllerUtils.getRepositoriesIds(req),
        controllerUtils.getTechnologiesIds(req),
        controllerUtils.getLimit(req, true),
        controllerUtils.getOffset(req, true)
    );

    return res.status(200).json(response);
};

const getPromptById = async (req: Request, res: Response) => {
    const response = await promptService.getPromptById(
        controllerUtils.getPromptId(req, true, 'url'),
    );

    return res.status(200).json(response);
};

const createPrompt = async (req: Request, res: Response) => {
    const response = await promptService.createPrompt(
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getDescription(req, false, 'post'),
        controllerUtils.getContent(req, true, 'post'),
        controllerUtils.getLanguageId(req, true, 'post'),
        controllerUtils.getRepositoryId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, false, 'post'),
        controllerUtils.getTemplatesIds(req, true, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getChatMessages(req, false, 'post'),
        controllerUtils.getPromptParameters(req, true, 'post')
    );

    return res.status(201).json(response);
}

const updatePrompt = async (req: Request, res: Response) => {
    const response = await promptService.updatePrompt(
        controllerUtils.getPromptId(req, true, 'url'),
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
        controllerUtils.getChatMessages(req, false, 'post'),
    );

    return res.status(201).json(response);
}

const deletePrompt = async (req: Request, res: Response) => {
    const response = await promptService.deletePrompt(
        controllerUtils.getPromptId(req, true, 'url')
    );

    return res.status(200).json(response);
}

export default {
    getPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt
};