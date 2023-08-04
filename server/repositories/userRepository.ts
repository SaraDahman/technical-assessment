import { User } from "../database/models";

export const createUser = async (newUser: any) => {
    return await User.create(newUser);
}

export const findUserByEmail = async (email: string) => {
    return await User.findOne({
        where: { email },
    });
}

