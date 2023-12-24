import { Request, Response } from "express";
import filterService from "../services/filterService";

const getFilters = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        const filters = await filterService.getFilters(userId as string);

        res.status(200).json(filters);
    } catch (error) {
        console.error('Error getting filters:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    getFilters
}