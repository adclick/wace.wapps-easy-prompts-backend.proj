import { Request, Response } from "express";
import technologyService from "../services/technologyService";

const getTechnologies = async (req: Request, res: Response) => {
    try {
        const response = await technologyService.getTechnologies();

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

const getDefault = async (req: Request, res: Response) => {
    try {
        const response = await technologyService.getDefault();

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    getTechnologies,
    getDefault,
};