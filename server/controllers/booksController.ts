import { Request, Response, NextFunction } from "express";
import { addBookValidation } from "../validation";
import booksService from "../services/booksService";
import { CustomError } from "../helpers";
import { IRequest } from "../interfaces";
import { validateParams } from "../helpers";

export const addOneBook =
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const data = await addBookValidation(req.body);
            const book = await booksService.addOneBook(data, userId);

            res.status(201)
                .json({ message: 'Book Added Successfully', data: book });

        } catch (error: any) {
            if (error.name === 'ValidationError') next(new CustomError(400, error.message));
            else next(error);
        }
    }

export const getAllBooks =
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const data = await booksService.getAllBooks(userId);

            res.status(200)
                .send({ message: 'Books Retrieved Successfully', data });

        } catch (error) {
            next(error);
        }

    }

export const getOneBook =
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const bookId = req.params.id;
            validateParams(bookId);
            const data = await booksService.getOneBook(bookId);

            res.status(200)
                .json({ message: 'Book Retrieved Successfully', data });
        } catch (error) {
            next(error);
        }
    }


export const deleteBook =
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const bookId = req.params.id;
            validateParams(bookId);
            await booksService.deleteBook(+bookId);

            res.status(200)
                .send({ message: 'Book Deleted Successfully' });
        } catch (error) {
            next(error);
        }
    }


export const updateBook =
    async (req: any, res: Response, next: NextFunction) => {
        res.send('this is update a book')
    }


export const filterBooks =
    async (req: any, res: Response, next: NextFunction) => {
        res.send('this is search book')
    }

