import { Request, Response } from "express";
import craftService from "../services/craftService";

interface FiltersQuery {
    search_term: string
    languages_ids : string,
    repositories_ids: string,
    technologies_ids: string,
    crafts_types: string
}

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

        const crafts = await craftService.getCrafts(
            userId,
            search_term,
            languages_ids.split(",").map(l => parseInt(l)),
            repositories_ids.split(",").map(l => parseInt(l)),
            technologies_ids.split(",").map(l => parseInt(l)),
            crafts_types.split(",")
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