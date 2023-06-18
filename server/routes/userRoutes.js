import express from 'express';
import auth from '../middleware/auth.js';
import {
  signUp,
  signIn,
  getUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/api/signup', signUp);
router.post('/api/signIn', signIn);

router.get('/api/user', auth, getUser);
router.put('/api/user', auth, updateUser);

export default router;