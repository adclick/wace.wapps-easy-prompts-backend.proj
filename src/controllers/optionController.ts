import { Request, Response } from "express";
import optionService from "../services/optionService";

const getOptions = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        const options = await optionService.getOptions(userId as string);

        res.status(200).json(options);
    } catch (error) {
        console.error('Error getting options:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getProvider = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const technologyId = req.params.technologyId;

        const filters = await optionService.getProvider(parseInt(technologyId));

        res.status(200).json({
            success: true,
            message: 'Getting Provider successfully',
            data: filters,
        });
    } catch (error) {
        console.error('Error getting provider:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getParameters = async (req: Request, res: Response) => {
    try {
        const technologyId = req.params.technologyId;
        const providerId = req.params.providerId;

        const filters = await optionService.getParameters(
            parseInt(technologyId),
            parseInt(providerId)
        );

        res.status(200).json({
            success: true,
            message: 'Getting Parameters successfully',
            data: filters,
        });
    } catch (error) {
        console.error('Error getting parameters:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export default {
    getOptions,
    getProvider,
    getParameters
};