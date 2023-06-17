import express from 'express';
import { getCategories, getCategoryGroups } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/api/categories', getCategories);
router.get('/api/category-groups', getCategoryGroups);

export default router;