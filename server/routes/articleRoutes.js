import express from 'express';
import { create, update, retrieve, list, deleteArticle } from '../controllers/articleController.js';

const router = express.Router();

router.route('/').get(list).post(create);
router.route('/:id').get(retrieve).patch(update).delete(deleteArticle);

export default router;
