import { IBook } from "../interfaces";
import { createBook, findAllBooks } from "../repositories/booksRepository";

const addOneBook = async (data: IBook, userId: number) => {
    const book = await createBook({
        ...data,
        userId
    });

    return { message: 'Book Added Successfully', data: book };
}

const getAllBooks = async (userId: number) => {
    const books = await findAllBooks(userId);

    return { message: 'Books Retrieved Successfully', data: books }
}

const getOneBook = async (bookId: number) => {
}

const filterBooks = async () => {
}

const deleteBook = async () => {
}

const updateBook = async () => {
}


export default {
    addOneBook,
    getOneBook,
    getAllBooks,
    filterBooks,
    deleteBook,
    updateBook
}