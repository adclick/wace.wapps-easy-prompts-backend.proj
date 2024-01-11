import { Request, Response } from "express";
import promptService from "../services/promptService";

const getFilters = async (req: Request, res: Response) => {
    try {
        const externalId = req.query.userId;
        const filters = await promptService.getFilters(externalId as string);

        res.status(200).json(filters);
    } catch (error) {
        console.error('Error getting filters:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// http://localhost:3000/api/crafts/123/?filters[search_term]=&filters[languages_ids]=2&filters[repositories_ids]=2&filters[technologies_ids]=1&filters[crafts_types]=PROMPTS
const getPrompts = async (req: Request, res: Response) => {
    try {
        const convertToIntArray = (data: string) => {
            if (data === "") return [];

            return data.split(",").map(d => parseInt(d));
        }

        const convertToStringArray = (data: string) => {
            if (data === "") return [];

            return data.split(",");
        }

        const prompts = await promptService.getPrompts(
            req.query.userId as string,
            req.query.search_term as string,
            convertToIntArray(req.query.languages_ids as string),
            convertToIntArray(req.query.repositories_ids as string),
            convertToIntArray(req.query.technologies_ids as string),
        );

        res.status(200).json(prompts);
    } catch (error) {
        console.error('Error getting prompts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const createPrompt = async (req: Request, res: Response) => {
    try {
        const modifiersIds = (req.body.modifiers_ids as string);

        const promptCreated = await promptService.createPrompt(
            req.body.userId as string,
            req.body.name as string,
            req.body.description as string,
            req.body.content as string,
            parseInt(req.body.language_id as string),
            parseInt(req.body.repository_id as string),
            parseInt(req.body.technology_id as string),
            parseInt(req.body.provider_id as string),
            JSON.parse(modifiersIds)
        );

        res.status(201).json(promptCreated);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

const deletePrompt = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const promptDeleted = await promptService.deletePrompt(parseInt(id));

        res.status(201).json(promptDeleted);
    } catch (error) {
        console.error('Error deleting prompt:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export default {
    getFilters,
    getPrompts,
    createPrompt,
    deletePrompt
};