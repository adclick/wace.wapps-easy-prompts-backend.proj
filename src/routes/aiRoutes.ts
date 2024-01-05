import express from 'express';
import aiController from '../controllers/aiController';

const router = express.Router();

// Define routes
router.post('/chat/', aiController.chat);
router.get('/text-generation/', aiController.textGeneration);
router.get('/image-generation/', aiController.imageGeneration);

export default router;
