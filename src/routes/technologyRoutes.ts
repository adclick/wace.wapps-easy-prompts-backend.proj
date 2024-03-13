import "express-async-errors";
import express from 'express';
import technologyController from '../controllers/technologyController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', technologyController.getTechnologies);
router.get('/default', technologyController.getDefault);

router.use(errorHandler);

export default router;
