import { Request, Response } from "express";
import templateService from "../services/templateService";
import controllerUtils from "../utils/controllerUtils";

const getTemplates = async (req: Request, res: Response) => {
    const prompts = await templateService.getTemplates(
        controllerUtils.getUserExternalId(req, true),
        controllerUtils.getSearchTerm(req),
        controllerUtils.getLanguagesIds(req, true),
        controllerUtils.getRepositoriesIds(req, true),
        controllerUtils.getTechnologiesIds(req),
        controllerUtils.getLimit(req, true),
        controllerUtils.getOffset(req, true)
    );

    return res.status(200).json(prompts);
};

const getAllTemplates = async (req: Request, res: Response) => {
    const prompts = await templateService.getAllTemplates(
        controllerUtils.getUserExternalId(req, true),
    );

    return res.status(200).json(prompts);
};

const getTemplateById = async (req: Request, res: Response) => {
    const response = await templateService.getTemplateById(
        controllerUtils.getTemplateId(req, true, 'url'),
    );

    return res.status(200).json(response);
};


const createTemplate = async (req: Request, res: Response) => {
    const response = await templateService.createTemplate(
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getDescription(req, true, 'post'),
        controllerUtils.getLanguageId(req, true, 'post'),
        controllerUtils.getRepositoryId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, false, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
        controllerUtils.getChatHistory(req, false, 'post'),
        controllerUtils.getTemplateParameters(req, true, 'post')
    );

    return res.status(201).json(response);
}

const updateTemplate = async (req: Request, res: Response) => {
    const response = await templateService.updateTemplate(
        controllerUtils.getTemplateId(req, true, 'url'),
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getDescription(req, true, 'post'),
        controllerUtils.getLanguageId(req, true, 'post'),
        controllerUtils.getRepositoryId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, false, 'post'),
        controllerUtils.getModifiersIds(req, true, 'post'),
    );

    return res.status(200).json(response);
}

const deleteTemplate = async (req: Request, res: Response) => {
    const response = await templateService.deleteTemplate(
        controllerUtils.getTemplateId(req, true, 'url')
    );

    return res.status(200).json(response);
}

export default {
    getTemplates,
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
};