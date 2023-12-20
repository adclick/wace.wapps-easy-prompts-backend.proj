import { Request, Response } from "express";
import craftService from "../services/craftService";
import { CRAFT_TYPE } from "@prisma/client";

interface FiltersQuery {
    search_term: string
    languages_ids: string,
    repositories_ids: string,
    technologies_ids: string,
    crafts_types: string
}

// http://localhost:3000/api/crafts/123/?filters[search_term]=&filters[languages_ids]=2&filters[repositories_ids]=2&filters[technologies_ids]=1&filters[crafts_types]=PROMPTS
const getCrafts = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const filtersQuery: unknown = req.query.filters;
        const filters = (filtersQuery as FiltersQuery);

        const convertToIntArray = (data: string) => {
            return data.split(",").map(d => parseInt(d));
        }

        const convertToStringArray = (data: string) => {
            return data.split(",");
        }

        const crafts = await craftService.getCrafts(
            userId,
            filters.search_term,
            convertToIntArray(filters.languages_ids),
            convertToIntArray(filters.repositories_ids),
            convertToIntArray(filters.technologies_ids),
            convertToStringArray(filters.crafts_types),
        );

        res.status(200).json({
            success: true,
            message: 'Getting Crafts successfully',
            data: crafts,
        });
    } catch (error) {
        console.error('Error getting crafts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const createPrompt = async (req: Request, res: Response) => {
    try {
        const promptCreated = await craftService.createPrompt(
            req.params.userId,
            req.body.name,
            req.body.description,
            req.body.content,
            req.body.language_id,
            req.body.repository_id,
            req.body.technology_id,
            req.body.provider_id,
            req.body.crafting_ids
        );

        res.status(201).json({
            success: true,
            message: 'Prompt created successfully',
            data: promptCreated,
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

const createModifier = async (req: Request, res: Response) => {
    try {
        const craftCreated = await craftService.createModifier(
            req.params.userId,
            req.body.name,
            req.body.description,
            req.body.content,
            req.body.language_id,
            req.body.repository_id,
            req.body.technology_id,
        );

        res.status(201).json({
            success: true,
            message: 'Modifier created successfully',
            data: craftCreated,
        });
    } catch (error) {
        console.error('Error creating modifier:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

const deleteCraft = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const craftDeleted = await craftService.deleteCraft(parseInt(id));

        res.status(201).json({
            success: true,
            message: 'Deleted successfully',
            data: craftDeleted,
        });
    } catch (error) {
        console.error('Error deleting craft:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export default {
    getCrafts,
    createPrompt,
    createModifier,
    deleteCraft
};