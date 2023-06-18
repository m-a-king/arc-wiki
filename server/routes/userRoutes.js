import express from 'express';
import auth from '../middleware/auth.js';
import {
  signUp,
  signIn,
  findId,
  getUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/api/signup', signUp);
router.post('/api/signIn', signIn);
router.post('/api/findId', findId);

router.get('/api/user', auth, getUser);
router.put('/api/user', auth, updateUser);

export default router;