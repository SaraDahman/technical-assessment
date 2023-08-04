import Joi from 'joi';
import { ISignIn } from '../interfaces';

const validateSignIn = ({
    email, password,
}: ISignIn) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.email': 'Invalid Email',
        }),
        password: Joi.string().min(8).required().messages({
            'any.required': 'Password is required',
            'string.min': `password should be at least 8 characters long`,
        }),
    });
    return schema.validateAsync({
        email, password,
    });
};

export default validateSignIn;