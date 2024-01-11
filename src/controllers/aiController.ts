import { Request, Response } from "express";
import aiService, { Thread } from "../services/aiService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const text = (req.query.text as string);
        const providerId = (req.query.provider_id as string);
        const modifiersIds = (req.query.modifiers_ids as string);
        const promptId = (req.query.prompt_id as string);

        const textGenerated = await aiService.textGeneration(
            text,
            parseInt(providerId),
            JSON.parse(modifiersIds),
            parseInt(promptId)
        );

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
        const modifiersIds = (req.query.modifiersIds as string);

        const imageGenerated = await aiService.imageGeneration(text, parseInt(providerId));

        res.status(200).json(imageGenerated);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const chat = async (req: Request, res: Response) => {
    try {
        const promptId = (req.body.promptId as string);
        const text = (req.body.text as string);
        const providerId = (req.body.providerId as string);
        const requests = (req.body.requests as Thread[]);
        const modifiersIds = (req.query.modifiersIds as string);

        const response = await aiService.chat(text, parseInt(providerId), requests, parseInt(promptId));

        res.status(200).json(response);
    } catch (error) {
        console.error('Error generating chat stream:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    textGeneration,
    imageGeneration,
    chat,
};