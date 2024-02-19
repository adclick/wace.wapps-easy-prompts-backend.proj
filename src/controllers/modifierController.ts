import { Request, Response } from "express";
import modifierService from "../services/modifierService";
import controllerUtils from "../utils/controllerUtils";

const getModifiers = async (req: Request, res: Response) => {
    const prompts = await modifierService.getModifiers(
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

const getAllModifiers = async (req: Request, res: Response) => {
    const prompts = await modifierService.getAllModifiers(
        controllerUtils.getUserExternalId(req, true),
    );

    return res.status(200).json(prompts);
};

const getModifierById = async (req: Request, res: Response) => {
    const response = await modifierService.getModifierById(
        controllerUtils.getModifierId(req, true, 'url'),
    );

    return res.status(200).json(response);
};

const createModifier = async (req: Request, res: Response) => {
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

    return res.status(201).json(response);
}

const updateModifier = async (req: Request, res: Response) => {
    const response = await modifierService.updateModifier(
        controllerUtils.getModifierId(req, true, 'url'),
        controllerUtils.getUserExternalId(req, true, 'post'),
        controllerUtils.getTitle(req, true, 'post'),
        controllerUtils.getDescription(req, true, 'post'),
        controllerUtils.getContent(req, true, 'post'),
        controllerUtils.getLanguageId(req, true, 'post'),
        controllerUtils.getRepositoryId(req, true, 'post'),
        controllerUtils.getTechnologyId(req, true, 'post'),
        controllerUtils.getProviderId(req, false, 'post')
    );

    return res.status(200).json(response);
}

const deleteModifier = async (req: Request, res: Response) => {
    const response = await modifierService.deleteModifier(
        controllerUtils.getModifierId(req, true, 'url')
    );

    return res.status(200).json(response);
}

export default {
    getModifiers,
    getAllModifiers,
    getModifierById,
    createModifier,
    updateModifier,
    deleteModifier
};