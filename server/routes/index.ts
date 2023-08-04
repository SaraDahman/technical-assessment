import express from 'express';
import authRouter from './authRoutes';
import booksRouter from './booksRoutes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', booksRouter);


export default router;