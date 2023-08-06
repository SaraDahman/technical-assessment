import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    else res.status(err.status || 500)
        .json({ message: err.message || 'Internal Server Error' });
}

export default errorHandler;