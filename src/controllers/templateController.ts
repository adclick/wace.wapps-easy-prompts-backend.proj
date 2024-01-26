import { Request, Response } from "express";
import templateService from "../services/templateService";
import controllerUtils from "../utils/controllerUtils";

const getTemplates = async (req: Request, res: Response) => {
    try {
        const prompts = await templateService.getTemplates(
            controllerUtils.getUserExternalId(req, true),
            controllerUtils.getSearchTerm(req),
            controllerUtils.getLanguagesIds(req, true),
            controllerUtils.getRepositoriesIds(req, true),
            controllerUtils.getLimit(req, true),
            controllerUtils.getOffset(req, true)
        );

        res.status(200).json(prompts);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const getTemplateById = async (req: Request, res: Response) => {
    try {
        const response = await templateService.getTemplateById(
            controllerUtils.getTemplateId(req, true, 'url'),
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};


const createTemplate = async (req: Request, res: Response) => {
    try {
        const response = await templateService.createTemplate(
            controllerUtils.getUserExternalId(req, true, 'post'),
            controllerUtils.getTitle(req, true, 'post'),
            controllerUtils.getDescription(req, true, 'post'),
            controllerUtils.getLanguageId(req, true, 'post'),
            controllerUtils.getRepositoryId(req, true, 'post'),
            controllerUtils.getTechnologyId(req, true, 'post'),
            controllerUtils.getProviderId(req, false, 'post'),
            controllerUtils.getModifiersIds(req, true, 'post'),
            controllerUtils.getChatHistory(req, false, 'post')
        );

        res.status(201).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

const deleteTemplate = async (req: Request, res: Response) => {
    try {
        const response = await templateService.deleteTemplate(
            controllerUtils.getTemplateId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

export default {
    getTemplates,
    getTemplateById,
    createTemplate,
    deleteTemplate
};