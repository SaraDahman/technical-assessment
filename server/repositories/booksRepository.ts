import { Book } from "../database/models";
import { Op } from "sequelize";
import { IBook } from "../interfaces";

export const createBook = async (newBook: any) => {
    return await Book.create(newBook);
}


export const findAllBooks = async (userId: number, paranoid: boolean, deleted: boolean) => {
    let where: any = {
        userId
    }
    if (deleted) {
        where = {
            ...where,
            deletedAt: { [Op.not]: null }
        }
    }
    return await Book.findAndCountAll({
        where,
        order: [
            ['title', 'ASC']
        ],
        limit: 6,
        paranoid
    });
}


export const findBookById = async (id: number) => {
    return await Book.findOne({
        where: { id },
    });
}


export const filterBooksByTitleAndCategory =
    async (title: string, category: string, page: number, paranoid: boolean, deleted: boolean) => {
        let offset;

        if (page > 1 && title) offset = 1
        else offset = (page - 1) * 6

        let where: any = {
            title: {
                [Op.iLike]: `%${title}%`
            },
        }
        if (category !== 'All') {
            where = {
                ...where,
                category
            }

        }

        if (deleted) {
            where = {
                ...where,
                deletedAt: { [Op.not]: null }
            }
        }

        return await Book.findAndCountAll({
            where,
            order: [
                ['title', 'ASC']
            ],
            limit: 6,
            offset,
            paranoid
        });
    }


export const deleteBookById = async (id: number, force: boolean) => {
    return await Book.destroy({
        where: { id },
        force
    })
}

export const updateBookById = async (data: IBook, id: number) => {
    return await Book.update({
        ...data
    }, {
        where: { id },
        paranoid: false
    });
}



