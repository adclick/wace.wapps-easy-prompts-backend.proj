import "express-async-errors";
import express from 'express';
import workspaceController from '../controllers/workspaceController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', workspaceController.getAllByUser);

router.use(errorHandler);

export default router;
