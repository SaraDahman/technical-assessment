import { Book } from "../database/models";

export const createBook = async (newBook: any) => {
    return await Book.create(newBook);
}

export const findBookByTitle = async (title: string) => {
    return await Book.findOne({
        where: { title },
    });
}

export const findAllBooks = async (userId: number) => {
    return await Book.findAll({
        where: { userId },
    });
}

export const deleteBookById = async (id: number) => {
}

export const updateBookById = async (id: number) => {
}



