import { Request, Response, NextFunction } from "express";
import { addBookValidation } from "../validation";
import booksService from "../services/booksService";
import { CustomError } from "../helpers";
import { IRequest } from "../interfaces";

export const addOneBook = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const data = await addBookValidation(req.body);
        const response = await booksService.addOneBook(data, userId);

        res.status(201).json(response);

    } catch (error: any) {
        if (error.name === 'ValidationError') next(new CustomError(400, error.message));
        else next(error);
    }
}

export const getAllBooks = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const response = await booksService.getAllBooks(userId);

        res.status(200).send(response);

    } catch (error) {
        next(error);
    }

}

export const getOneBook = async (req: any, res: Response) => {
    res.send('this is get one book')
}

export const deleteBook = async (req: any, res: Response) => {
    res.send('this is delete a book')
}

export const updateBook = async (req: any, res: Response) => {
    res.send('this is update a book')
}

export const filterBooks = async (req: any, res: Response) => {
    res.send('this is search book')
}

