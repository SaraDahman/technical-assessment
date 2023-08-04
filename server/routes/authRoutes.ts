import express from 'express';
import { signIn, signUp, signOut } from '../controllers/authController';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.delete('/signOut', signOut);

export default router;