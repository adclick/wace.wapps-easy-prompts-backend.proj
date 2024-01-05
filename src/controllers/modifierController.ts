import { Request, Response } from "express";
import promptService from "../services/promptService";
import modifierService from "../services/modifierService";

const getFilters = async (req: Request, res: Response) => {
    try {
        const externalId = req.query.userId;
        const filters = await modifierService.getFilters(externalId as string);

        res.status(200).json(filters);
    } catch (error) {
        console.error('Error getting filters:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getModifiers = async (req: Request, res: Response) => {
    try {
        const convertToIntArray = (data: string) => {
            if (data === "") return [];

            return data.split(",").map(d => parseInt(d));
        }

        const convertToStringArray = (data: string) => {
            if (data === "") return [];
            
            return data.split(",");
        }

        const prompts = await modifierService.getModifiers(
            req.query.userId as string,
            req.query.search_term as string,
            convertToIntArray(req.query.languages_ids as string),
            convertToIntArray(req.query.repositories_ids as string),
        );

        res.status(200).json(prompts);
    } catch (error) {
        console.error('Error getting modifiers:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const createModifier = async (req: Request, res: Response) => {
    try {
        const promptCreated = await modifierService.createModifier(
            req.body.userId,
            req.body.name,
            req.body.description,
            req.body.content,
            req.body.language_id,
            req.body.repository_id,
        );

        res.status(201).json(promptCreated);
    } catch (error) {
        console.error('Error getting modifier:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

const deleteModifier = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const promptDeleted = await modifierService.deleteModifier(parseInt(id));

        res.status(201).json(promptDeleted);
    } catch (error) {
        console.error('Error deleting modifier:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export default {
    getFilters,
    getModifiers,
    createModifier,
    deleteModifier
};