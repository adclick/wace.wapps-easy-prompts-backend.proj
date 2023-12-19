import express from 'express';
import craftController from '../controllers/craftController';
const router = express.Router();

// Define routes
router.get('/:userId/', craftController.getCrafts);

export default router;
