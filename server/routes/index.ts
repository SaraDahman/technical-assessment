import express from 'express';
import authRouter from './authRoutes';
import booksRouter from './booksRoutes';
import { checkAuth } from '../middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', checkAuth, booksRouter);


export default router;