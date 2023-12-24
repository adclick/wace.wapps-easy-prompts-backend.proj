import { Request, Response } from "express";
import technologyService from "../services/technologyService";

const getDefault = async (req: Request, res: Response) => {
    try {
        const technology = await technologyService.getDefault();

        res.status(200).json(technology);
    } catch (error) {
        console.error('Error getting options:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export default {
    getDefault,
};