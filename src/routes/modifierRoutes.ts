import express from 'express';
import modifierController from '../controllers/modifierController';
const router = express.Router();

// Define routes
router.get('/', modifierController.getModifiers);
router.get('/filters', modifierController.getFilters);
router.post('/:userId/modifier', modifierController.createModifier);
router.delete('/:id', modifierController.deleteModifier);

export default router;