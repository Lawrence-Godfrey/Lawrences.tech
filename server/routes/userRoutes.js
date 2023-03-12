import express from 'express';
import { update, retrieve, list } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(list);
router.route('/:id').get(retrieve).patch(update);

export default router;