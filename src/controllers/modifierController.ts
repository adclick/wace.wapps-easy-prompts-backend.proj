import { Request, Response } from "express";
import modifierService from "../services/modifierService";
import controllerUtils from "../utils/controllerUtils";

const getFilters = async (req: Request, res: Response) => {
    try {
        const response = await modifierService.getFilters(
            controllerUtils.getUserExternalId(req, true)
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
};

const getModifiers = async (req: Request, res: Response) => {
    try {
        const prompts = await modifierService.getModifiers(
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

const createModifier = async (req: Request, res: Response) => {
    try {
        const response = await modifierService.createModifier(
            controllerUtils.getUserExternalId(req, true, 'post'),
            controllerUtils.getTitle(req, true, 'post'),
            controllerUtils.getDescription(req, true, 'post'),
            controllerUtils.getContent(req, true, 'post'),
            controllerUtils.getLanguageId(req, true, 'post'),
            controllerUtils.getRepositoryId(req, true, 'post'),
            controllerUtils.getTechnologyId(req, true, 'post'),
            controllerUtils.getProviderId(req, false, 'post')
        );

        res.status(201).json(response);
    } catch (error: any) {
        console.error(error);
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

const deleteModifier = async (req: Request, res: Response) => {
    try {
        const response = await modifierService.deleteModifier(
            controllerUtils.getModifierId(req, true, 'url')
        );

        res.status(200).json(response);
    } catch (error: any) {
        const {code, status, message} = controllerUtils.getErrorResponse(error);
        
        return res.status(code).json({ status, message });
    }
}

export default {
    getFilters,
    getModifiers,
    createModifier,
    deleteModifier
};