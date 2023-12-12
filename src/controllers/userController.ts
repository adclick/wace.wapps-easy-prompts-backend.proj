import { Request, Response } from "express";

import userService from '../services/userService';

const getUser = async (req: Request, res: Response) => {
    console.log(req);
    try {
        const auth0Id = req.params.id
        console.log(req.params);
        const user = await userService.getUser(auth0Id);

        res.status(201).json({
            success: true,
            message: 'Getting User successfully',
            data: user,
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
    getUser
};