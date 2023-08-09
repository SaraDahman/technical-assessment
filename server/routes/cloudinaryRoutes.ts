import express from "express";
import { uploadImage } from "../controllers/cloudinaryController";

const router = express.Router();

router.post('/image', uploadImage);

export default router;