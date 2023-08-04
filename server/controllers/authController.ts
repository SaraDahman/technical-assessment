import { Request, Response, NextFunction } from "express";
import { signUpValidation, signInValidation } from "../validation";
import authService from '../services/authService';
import { CustomError } from "../helpers";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await signUpValidation(req.body);
        const token = await authService.signUp(data);

        res.cookie('token', token, { httpOnly: true, secure: true }).status(201).json({ message: 'Your Account Is Created Successfully' });

    } catch (error: any) {
        if (error.name === 'ValidationError') next(new CustomError(400, error.message));
        else next(error);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = await signInValidation(req.body);
        const token = await authService.signIn(data);

        res.cookie('token', token, { httpOnly: true, secure: true }).status(200).json({ message: 'Welcome Back' });
    } catch (error: any) {
        if (error.name === 'ValidationError') next(new CustomError(400, error.message));
        else next(error);
    }

}

export const signOut = async (req: Request, res: Response) => {
    res.clearCookie('token').json({ message: 'Logged Out Successfully' });
}

