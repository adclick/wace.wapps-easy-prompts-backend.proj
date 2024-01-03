import { Request, Response } from "express";
import providerService from "../services/providerService";

const getDefault = async (req: Request, res: Response) => {
    try {
        const provider = await providerService.getDefault(parseInt(req.query.technologyId as string));

        res.status(200).json(provider);
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
        const providers = await providerService.getProviders(parseInt(req.query.technologyId as string));

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