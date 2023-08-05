import { IBook } from "../interfaces";
import { createBook } from "../repositories/booksReposity";

const addOneBook = async (data: IBook, userId: number) => {
    const book = await createBook({
        ...data,
        userId
    });

    return { message: 'Book Added Successfully', data: book };
}

const getOneBook = async () => {
}

const getAllBooks = async () => {
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