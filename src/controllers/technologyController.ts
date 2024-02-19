import { Request, Response } from "express";
import technologyService from "../services/technologyService";
import controllerUtils from "../utils/controllerUtils";

const getTechnologies = async (req: Request, res: Response) => {
    const response = await technologyService.getTechnologies();

    return res.status(200).json(response);
};

const getDefault = async (req: Request, res: Response) => {
    const response = await technologyService.getDefault();

    return res.status(200).json(response);
};

export default {
    getTechnologies,
    getDefault,
};