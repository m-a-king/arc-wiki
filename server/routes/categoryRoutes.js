import express from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/api/categories', getCategories);

export default router;