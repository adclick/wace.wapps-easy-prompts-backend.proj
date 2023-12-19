import { Request, Response } from "express";
import craftService from "../services/craftService";

interface FiltersQuery {
    search_term: string
    languages_ids : string,
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

        const {
            search_term,
            languages_ids,
            repositories_ids,
            technologies_ids,
            crafts_types
        } = filters;

        const convertToIntArray = (data: string) => {
            return data.split(",").map(d => parseInt(d));
        }

        const convertToStringArray = (data: string) => {
            return data.split(",");
        }

        const crafts = await craftService.getCrafts(
            userId,
            search_term,
            convertToIntArray(languages_ids),
            convertToIntArray(repositories_ids),
            convertToIntArray(technologies_ids),
            convertToStringArray(crafts_types),
        );

        res.status(200).json({
            success: true,
            message: 'Getting Crafts successfully',
            data: crafts,
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    getCrafts
};