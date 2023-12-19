import { Request, Response } from "express";
import filtersService from "../services/filterService";

const getFilters = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const filters = await filtersService.getFilters(userId);

        res.status(200).json({
            success: true,
            message: 'Getting Filters successfully',
            data: filters,
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
    getFilters
};