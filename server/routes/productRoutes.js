import express from 'express';
import auth from '../middleware/auth.js';
import { colorUpload, reviewUpload } from '../middleware/multer.js';
import {
  getFeatures,
  getMaterials,
  getCares,
  getProducts,
  getProduct,
  addProduct,
  getReviews,
  getMyReviews,
  getReview,
  addReview,
  deleteReviews,
  getComments,
  getMyComments,
  addComment,
  deleteComments,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/api/features', getFeatures);
router.get('/api/materials', getMaterials);
router.get('/api/cares', getCares);
router.get('/api/products', getProducts);
router.get('/api/product/:idx', getProduct);
router.post('/api/product', colorUpload.any(), addProduct);
router.get('/api/reviews/:idx?', getReviews);
router.get('/api/mypage/reviews', auth, getMyReviews);
router.get('/api/review/:idx', getReview);
router.post('/api/review', auth, reviewUpload.single('image'), addReview);
router.delete('/api/reviews', deleteReviews);
router.get('/api/comments/:idx?', getComments);
router.get('/api/mypage/comments', auth, getMyComments);
router.post('/api/comment',  auth, addComment);
router.delete('/api/comments', deleteComments);

export default router;