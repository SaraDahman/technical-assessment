import { Request, Response, NextFunction } from "express";
import { verifyToken, CustomError } from "../helpers";

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error();

        else {
            const payload: any = await verifyToken(token);
            req.user = payload;
        }
        next()
    } catch (error) {
        const err = new CustomError(401, 'Unauthorized')
        next(err);
    }

};

export default checkAuth;
