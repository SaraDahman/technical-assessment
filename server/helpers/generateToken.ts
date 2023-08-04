import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;


const generateToken = (id: number, email: string) => (
    new Promise((resolve, reject) => {
        if (!SECRET_KEY) {
            throw new Error('SECRET_KEY is not found in .env')
        }
        sign({ id, email }, SECRET_KEY, (err: any, token: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    }));

export default generateToken;