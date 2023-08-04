import { Request, Response } from "express";

export const addOneBook = async (req: Request, res: Response) => {
    res.send('this is add one book')
}

export const filterBooks = async (req: Request, res: Response) => {
    res.send('this is search book')
}

export const getAllBooks = async (req: Request, res: Response) => {
    res.send('this is get all books')
}

export const deleteBook = async (req: Request, res: Response) => {
    res.send('this is delete a book')
}

export const updateBook = async (req: Request, res: Response) => {
    res.send('this is update a book')
}