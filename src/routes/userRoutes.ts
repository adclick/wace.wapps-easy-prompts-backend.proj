import "express-async-errors";
import express from 'express';
import userController from '../controllers/userController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.post('/login', userController.login);

router.use(errorHandler);

export default router;