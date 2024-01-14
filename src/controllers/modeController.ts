import { Request, Response } from "express";
import modeService from "../services/modeService";

const getModes = async (req: Request, res: Response) => {
    try {
        const response = await modeService.getModes();

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const getDefault = async (req: Request, res: Response) => {
    try {
        const response = await modeService.getDefault();

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    getModes,
    getDefault,
};