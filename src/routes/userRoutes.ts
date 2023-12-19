import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

// Define routes
router.get('/login/:id/:email', userController.login);

export default router;