import express from 'express';
import { signUp, signIn } from '../controllers/userController.js';

const router = express.Router();

router.post('/api/signup', signUp);
router.post('/api/signIn', signIn);

export default router;