import { ISignup, ISignIn } from "../interfaces";
import { CustomError } from "../helpers";
import { findUserByEmail, createUser } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers";


const signUp = async ({ firstName, lastName, email, password }: ISignup) => {
    const result = await findUserByEmail(email, '');

    if (result) throw new CustomError(400, 'Email Already In Use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ firstName, lastName, email, password: hashedPassword });

    const token = await generateToken(user.id, user.email);

    return { token, user };
};


const signIn = async ({ email, password }: ISignIn) => {
    const user = await findUserByEmail(email, '');

    if (!user) throw new CustomError(400, 'Invalid Credentials');

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) throw new CustomError(400, 'Invalid Credentials');

    const token = await generateToken(user.id, user.email);

    return { token, user };
};


const getUser = async (email: string) => {
    const user = await findUserByEmail(email, 'password');
    if (!user) throw new CustomError(400, 'No User exists with the email');
    return user
};


export default {
    signUp,
    signIn,
    getUser
}