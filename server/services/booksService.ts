import { CustomError } from "../helpers";
import { IBook } from "../interfaces";
import {
    createBook,
    findAllBooks,
    findBookById,
    deleteBookById,
    updateBookById,
    filterBooksByTitleAndCategory,
} from "../repositories/booksRepository";

const addOneBook = async (data: IBook, userId: number) => {
    const book = await createBook({
        ...data,
        userId
    });

    return book;
}

const getAllBooks = async (userId: number, paranoid: boolean, deleted: boolean) => {

    const books = await findAllBooks(userId, paranoid, deleted);

    return books;
}

const getOneBook = async (bookId: number) => {
    const book = await findBookById(bookId);

    if (!book) throw new CustomError(400, 'Book Doesn\'t Exist');

    return book;
}

const deleteBook = async (bookId: number, force: boolean) => {
    const deletedBook = await deleteBookById(bookId, force);

    if (!deletedBook) throw new CustomError(400, 'Book Doesn\'t Exist');

    return deletedBook;
}

const updateBook = async (data: IBook, bookId: number) => {
    const [updatedBook] = await updateBookById(data, bookId);

    if (!updatedBook) throw new CustomError(400, 'Book Doesn\'t Exist');

    return updatedBook;
}

const filterBooks =
    async (title: string, category: string, page: number, paranoid: boolean, deleted: boolean) => {

        const books = await filterBooksByTitleAndCategory(title, category, page, paranoid, deleted)
        return books
    }


export default {
    addOneBook,
    getOneBook,
    getAllBooks,
    filterBooks,
    deleteBook,
    updateBook
}