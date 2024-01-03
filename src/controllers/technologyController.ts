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

const getProviders = async (req: Request, res: Response) => {
    try {
        const providers = await technologyService.getProvidersByTechnologyId(parseInt(req.params.id));

        res.status(200).json(providers);
    } catch (error) {
        console.error('Error getting providers:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export default {
    getDefault,
    getProviders
};