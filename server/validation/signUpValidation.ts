import Joi from 'joi';
import ISignUp from '../interfaces/ISignUp';

const validateSignup = ({
    firstName, lastName, email, password,
}: ISignUp) => {
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            'any.required': 'First name is required',
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'Last name is required',
            'string.empty': 'Last name is required',
        }),
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
        firstName, lastName, email, password,
    });
};

export default validateSignup;