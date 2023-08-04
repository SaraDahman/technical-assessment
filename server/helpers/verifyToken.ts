import { verify } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;

const verifyToken = (token: string) =>
    new Promise((resolve, reject) => {
        if (!SECRET_KEY) {
            throw new Error('SECRET_KEY is not found in .env');
        }
        verify(token, SECRET_KEY, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        })
    });

export default verifyToken;