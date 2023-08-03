import express, { Request, Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const { PORT, NODE_ENV } = process.env

app.disable('x-powered-by')
app.use([
    compression(),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser()
])

app.set('port', PORT || 8080);

if (NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../client/dist')));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
    })
}


export default app;