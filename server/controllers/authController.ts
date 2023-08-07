import { Request, Response, NextFunction } from "express";
import { signUpValidation, signInValidation } from "../validation";
import authService from '../services/authService';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await signUpValidation(req.body);
        const { token, user } = await authService.signUp(data);

        res.cookie('token', token, { httpOnly: true, secure: true }).status(201).json({ message: 'Your Account Is Created Successfully', user });

    } catch (error: any) {
        next(error);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = await signInValidation(req.body);
        const { token, user } = await authService.signIn(data);

        res.cookie('token', token, { httpOnly: true, secure: true }).status(200).json({ message: 'Welcome Back', user });
    } catch (error: any) {
        next(error);
    }

}

export const signOut = async (req: Request, res: Response) => {
    res.clearCookie('token').json({ message: 'Logged Out Successfully' });
}

export const getUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user: { email } } = req;
        const user = await authService.getUser(email);


        res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}

