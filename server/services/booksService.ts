import { CustomError } from "../helpers";
import { IBook } from "../interfaces";
import { createBook, findAllBooks, findBookById, deleteBookById } from "../repositories/booksRepository";

const addOneBook = async (data: IBook, userId: number) => {
    const book = await createBook({
        ...data,
        userId
    });

    return book;
}

const getAllBooks = async (userId: number) => {
    const books = await findAllBooks(userId);

    return books;
}

const getOneBook = async (bookId: number) => {
    const book = await findBookById(bookId);

    if (!book) throw new CustomError(400, 'Book Doesn\'t Exist');

    return book;
}

const deleteBook = async (bookId: number) => {
    const deletedBook = await deleteBookById(bookId);

    if (!deletedBook) throw new CustomError(400, 'Book Doesn\'t Exist');

    return deletedBook;
}

const filterBooks = async (title: string) => {
}


const updateBook = async (bookId: number) => {
}


export default {
    addOneBook,
    getOneBook,
    getAllBooks,
    filterBooks,
    deleteBook,
    updateBook
}