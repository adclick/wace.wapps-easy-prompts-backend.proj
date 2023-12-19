import { NextFunction, Request, Response } from "express";
import aiService from "../services/aiService";

const textGeneration = async (req: Request, res: Response) => {
    try {
        const text = (req.query.text as string);
        const prompt_id = (req.query.prompt_id as string);
        const modifiers_ids = (req.query.modifiers_ids as string);

        const promptId = prompt_id !== undefined ? parseInt(prompt_id) : null;
        const modifiersIds = modifiers_ids !== undefined ? modifiers_ids.split(",").map(m => parseInt(m)) : [];

        const textGenerated = await aiService.textGeneration(
            text,
            promptId,
            modifiersIds
        );

        res.status(200).json({
            success: true,
            message: 'Text Generated successfully',
            data: textGenerated,
        });
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
        const provider = (req.query.provider as string);
        const resolution = (req.query.resolution as string);
        const num_images = (req.query.num_images as string);
        const prompt_id = (req.query.prompt_id as string);
        const modifiers_ids = (req.query.modifiers_ids as string);

        const promptId = prompt_id !== undefined ? parseInt(prompt_id) : null;
        const modifiersIds = modifiers_ids !== undefined ? modifiers_ids.split(",").map(m => parseInt(m)) : [];

        const imageGenerated = await aiService.imageGeneration(
            text,
            provider,
            resolution,
            num_images
        );

        res.status(200).json({
            success: true,
            message: 'Text Generated successfully',
            data: imageGenerated,
        });
    } catch (error) {
        console.error('Error generating text:', error);
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