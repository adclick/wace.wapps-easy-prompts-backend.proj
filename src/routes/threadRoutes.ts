import "express-async-errors";
import express from 'express';
import threadController from '../controllers/threadController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', threadController.getAllThreadsByWorkspace);
router.post('/', threadController.createOneThread);
router.post('/:thread_id', threadController.updateOneThread);
router.delete('/:thread_id', threadController.deleteOnethread);

router.use(errorHandler);

export default router;
