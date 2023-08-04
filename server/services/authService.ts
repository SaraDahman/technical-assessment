import { ISignup, ISignIn } from "../interfaces";
import { CustomError } from "../helpers";
import { findUserByEmail, createUser } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers";


const signUp = async ({ firstName, lastName, email, password }: ISignup) => {
    const user = await findUserByEmail(email);

    if (user) throw new CustomError(400, 'Email Already In Use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser({ firstName, lastName, email, password: hashedPassword });

    const token = generateToken(result.id, result.email);

    return token;
};


const signIn = async ({ email, password }: ISignIn) => {
    const user = await findUserByEmail(email);

    if (!user) throw new CustomError(400, 'Email Doesn\'t exist');

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) throw new CustomError(400, 'Incorrect Password');

    const token = generateToken(user.id, user.email);

    return token;
};


export default {
    signUp,
    signIn,
}