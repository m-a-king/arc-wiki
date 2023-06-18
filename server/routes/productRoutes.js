import express from 'express';
import {
  getFeatures,
  getMaterials,
  getCares,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/api/features', getFeatures);
router.get('/api/materials', getMaterials);
router.get('/api/cares', getCares);

export default router;