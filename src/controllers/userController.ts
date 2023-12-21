import { Request, Response } from "express";

import userService from '../services/userService';

const login = async (req: Request, res: Response) => {
    try {
        const auth0Id = req.body.userId;
        const email = req.body.email;
        const user = await userService.login(auth0Id, email);

        res.status(200).json({
            success: true,
            message: 'User Loged in successfully',
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
    login
};