import { Request, Response } from "express";
import userService from "../services/userService";
import controllerUtils from "../utils/controllerUtils";

const login = async (req: Request, res: Response) => {
    try {
        const response = await userService.login(
            controllerUtils.getEmail(req, true, 'post'),
            controllerUtils.getUsername(req, true, 'post'),
            controllerUtils.getUserExternalId(req, true, 'post'),
        );

        res.status(200).json(response);
    } catch ({ message }: any) {
        res.status(400).json({ success: false, message });
    }
};

export default {
    login
}