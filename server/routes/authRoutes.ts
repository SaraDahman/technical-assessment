import express from 'express';
import { signIn, signUp, signOut, getUser } from '../controllers/authController';
import { checkAuth } from '../middleware';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.delete('/signOut', signOut);
router.get('/me', checkAuth, getUser);

export default router;