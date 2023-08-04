import express from 'express';
import { addOneBook, getAllBooks, deleteBook, updateBook, filterBooks } from '../controllers/booksController';

const router = express.Router();

router.post('/', addOneBook);
router.get('/', getAllBooks);
router.get('/filter', filterBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;