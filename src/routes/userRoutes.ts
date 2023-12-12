import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

// Define routes
router.get('/users/:id', userController.getUser);

export default router;