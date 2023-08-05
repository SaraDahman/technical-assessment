import { CustomError } from "../helpers";
import { IBook } from "../interfaces";
import { createBook, findAllBooks, findBookById } from "../repositories/booksRepository";

const addOneBook = async (data: IBook, userId: number) => {
    const book = await createBook({
        ...data,
        userId
    });

    return { message: 'Book Added Successfully', data: book };
}

const getAllBooks = async (userId: number) => {
    const books = await findAllBooks(userId);

    return { message: 'Books Retrieved Successfully', data: books };
}

const getOneBook = async (bookId: number) => {
    const book = await findBookById(bookId);

    if (!book) throw new CustomError(400, 'Book Doesn\'t Exist');

    return { message: 'Book Retrieved Successfully', data: book };
}

const filterBooks = async (title: string) => {
}

const deleteBook = async (bookId: number) => {
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