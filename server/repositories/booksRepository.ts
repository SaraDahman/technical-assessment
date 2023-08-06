import { Book } from "../database/models";
import { Op } from "sequelize";
import { IBook } from "../interfaces";

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
    return await Book.destroy({
        where: { id },
    })
}

export const updateBookById = async (data: IBook, id: number) => {
    return await Book.update({
        ...data
    }, {
        where: { id }
    });
}



