import { cloudinary } from "../storage";

const uploadImage = async (dataURI: string) => {
    return await cloudinary.uploader.upload(dataURI, {
        folder: 'uploads',
        timeout: 120000
    });
}

export default {
    uploadImage
}
