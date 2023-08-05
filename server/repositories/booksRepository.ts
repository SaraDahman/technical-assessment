import { Book } from "../database/models";
import { Op } from "sequelize";

export const createBook = async (newBook: any) => {
    return await Book.create(newBook);
}


export const findAllBooks = async (userId: number) => {
    return await Book.findAll({
        where: { userId },
    });
}


export const findBookById = async (id: number) => {
    return await Book.findOne({
        where: { id },
    });
}


export const findBookByTitle = async (title: string) => {
    return await Book.findOne({
        where: {
            title: {
                [Op.like]: `${title}%`
            }
        },
    });
}


export const deleteBookById = async (id: number) => {
}

export const updateBookById = async (id: number) => {
}



