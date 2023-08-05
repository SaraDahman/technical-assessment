import express from 'express';
import {
    addOneBook,
    getAllBooks,
    deleteBook,
    updateBook,
    filterBooks,
    getOneBook
} from '../controllers/booksController';

const router = express.Router();

router.post('/', addOneBook);
router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);
router.get('/filter', filterBooks);

export default router;