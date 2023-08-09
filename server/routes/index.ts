import express from 'express';
import authRouter from './authRoutes';
import booksRouter from './booksRoutes';
import cloudinaryRouter from './cloudinaryRoutes';

import { checkAuth } from '../middleware';
import { upload } from '../middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', checkAuth, booksRouter);
router.use('/upload', checkAuth, upload.single('image'), cloudinaryRouter);


export default router;