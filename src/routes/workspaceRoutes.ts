import express from 'express';
import { errorHandler } from '../middlewares/errors';
import workspaceController from '../controllers/workspaceController';

const router = express.Router();

// Define routes
router.get('/', workspaceController.getAllByUser);

router.use(errorHandler);

export default router;
