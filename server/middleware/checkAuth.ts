import { Request, Response, NextFunction } from "express";
import { verifyToken, CustomError } from "../helpers";

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;

        const payload: any = await verifyToken(token);
        req.user = payload;

        next()
    } catch (error) {
        next(new CustomError(401, 'Unauthorized'));
    }

};

export default checkAuth;
