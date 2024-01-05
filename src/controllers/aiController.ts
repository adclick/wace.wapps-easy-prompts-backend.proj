import { Request, Response } from "express";
import aiService, { Thread } from "../services/aiService";

const chat = async (req: Request, res: Response) => {
    try {
        const text = (req.body.text as string);
        const providerId = (req.body.providerId as string);
        const threads = (req.body.providerId as Thread[]);

        const response = await aiService.chat(text, parseInt(providerId), threads);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error generating chat stream:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

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
    chat,
    textGeneration,
    imageGeneration
};