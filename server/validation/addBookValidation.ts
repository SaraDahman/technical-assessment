import Joi from 'joi';
import { IBook } from '../interfaces';


const validateBook = ({
    title, author, image, category, description
}: IBook) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'any.required': 'Title is required',
        }),
        author: Joi.string().required().messages({
            'any.required': 'Author is required',
        }),
        image: Joi.string().required().messages({
            'any.required': 'Image is required',
        }),
        category: Joi.string().required().messages({
            'any.required': 'Category is required',
        }),
        description: Joi.string().required().messages({
            'any.required': 'Description is required',
        }),
    });
    return schema.validateAsync({
        title, author, image, category, description
    });
};

export default validateBook;