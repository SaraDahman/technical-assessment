import { Request, Response, NextFunction } from "express";
import cloudinaryService from "../services/cloudinaryService";
import { CustomError } from "../helpers";


export const uploadImage =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new CustomError(400, 'No image file provided')
            }


            const b64 = Buffer.from(req.file?.buffer as any).toString("base64");
            let dataURI = "data:" + req.file?.mimetype + ";base64," + b64;


            const result = await cloudinaryService.uploadImage(dataURI)

            res.status(200).json({ imageUrl: result.secure_url });
        } catch (error: any) {
            if (error.name === 'TimeoutError') next(new CustomError(error.http_code, 'Check your internet connection'));
            next(error);
        }
    };