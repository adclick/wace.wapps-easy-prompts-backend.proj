import { Request, Response } from "express";
import promptService from "../services/promptService";
import controllerUtils from "../utils/controllerUtils";

const getFilters = async (req: Request, res: Response) => {
    try {
        const response = await promptService.getFilters(
            controllerUtils.getUserExternalId(req, true)
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const getPrompts = async (req: Request, res: Response) => {
    try {
        const response = await promptService.getPrompts(
            controllerUtils.getUserExternalId(req, true),
            controllerUtils.getSearchTerm(req, false),
            controllerUtils.getLanguagesIds(req),
            controllerUtils.getRepositoriesIds(req),
            controllerUtils.getTechnologiesIds(req),
            controllerUtils.getModesIds(req),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
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
            controllerUtils.getModeId(req, true, 'post'),
            controllerUtils.getProviderId(req, true, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post')
        );

        res.status(201).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
}

const deletePrompt = async (req: Request, res: Response) => {
    try {
        const response = await promptService.deletePrompt(
            controllerUtils.getPromptId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });

    }
}

export default {
    getFilters,
    getPrompts,
    createPrompt,
    deletePrompt
};