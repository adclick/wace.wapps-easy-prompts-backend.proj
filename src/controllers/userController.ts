import { Request, Response } from "express";

const userService = require('../services/userService');

const getUser = async (req: Request, res: Response) => {
    try {
        const auth0Id = req.params.id // Assuming the request body contains user data
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

module.exports = {
    getUser,
};