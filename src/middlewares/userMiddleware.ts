import { NextFunction, Request, Response } from "express";
import controllerUtils from "../utils/controllerUtils";
import userModel from "../models/userModel";
import BadRequestError from "../errors/BadRequestError";

const userExists = (req: Request, res: Response, next: NextFunction) => {
    const userExternalId = controllerUtils.getUserExternalId(req, true, 'get');
    if (!userExternalId) {
        throw new BadRequestError({message: 'User not provided'});
    }

    const user = userModel.getOneById(userExternalId);
    if (!user) {
        throw new BadRequestError({message: 'User not found'});
    }

    return next();
}

export {
    userExists
}