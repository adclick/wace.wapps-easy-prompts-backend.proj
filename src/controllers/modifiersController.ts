import { Request, Response } from "express";
import modifiersService from "../services/modifiersService";

const getModifiersByPromptId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const promptId = req.params.promptId;
        const modifiers = await modifiersService.getModifiersByPromptId(userId, parseInt(promptId));

        res.status(200).json({
            success: true,
            message: 'Getting Modifiers successfully',
            data: modifiers,
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
    getModifiersByPromptId
};