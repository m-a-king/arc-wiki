import express from 'express';
import upload from '../middleware/multer.js';
import {
  getFeatures,
  getMaterials,
  getCares,
  getProducts,
  addProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/api/features', getFeatures);
router.get('/api/materials', getMaterials);
router.get('/api/cares', getCares);
router.get('/api/products', getProducts);
router.post('/api/product', upload.fields([
  { name: 'colors[].image', maxCount: 1 },
]), addProduct);

export default router;