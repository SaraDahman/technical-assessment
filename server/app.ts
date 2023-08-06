import express, { Request, Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { join } from 'path';
import router from "./routes";
import { CustomError } from "./helpers";
import { errorHandler } from "./middleware";

const app = express();
const { PORT, NODE_ENV } = process.env

app.disable('x-powered-by')
app.use([
    compression(),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser()
])

app.use('/api/v1', router)

app.set('port', PORT || 3000);

if (NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../client/dist')));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
    })
}

app.use((req: Request, res: Response, next) => {
    const error = new CustomError(404, 'Not Found');
    next(error);
});

app.use(errorHandler);


export default app;