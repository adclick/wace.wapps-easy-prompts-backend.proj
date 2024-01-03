import { Request, Response } from "express";
import aiService from "../services/aiService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const text = (req.query.text as string);
        const providerId = (req.query.providerId as string);

        const textGenerated = await aiService.textGeneration(text, parseInt(providerId));

        res.status(200).json(textGenerated);
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const imageGeneration = async (req: Request, res: Response) => {
    try {
        const text = (req.query.text as string);
        const providerId = (req.query.providerId as string);
        const parameters = JSON.parse(req.query.parameters as string);

        const imageGenerated = await aiService.imageGeneration(
            text,
            parseInt(providerId),
            parameters,
        );

        res.status(200).json(imageGenerated);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export default {
    textGeneration,
    imageGeneration
};