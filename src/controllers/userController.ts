import { Request, Response } from "express";
import userService from "../services/userService";
import controllerUtils from "../utils/controllerUtils";

const login = async (req: Request, res: Response) => {
    const response = await userService.login(
        controllerUtils.getEmail(req, true, 'post'),
        controllerUtils.getUsername(req, true, 'post'),
        controllerUtils.getUserExternalId(req, true, 'post'),
    );

    return res.status(200).json(response);
};

export default {
    login
}