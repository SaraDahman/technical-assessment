import { User } from "../database/models";

export const createUser = async (newUser: any) => {
    return await User.create(newUser, {
        returning: ['firstName', 'lastName', 'id', 'email', 'createdAt', 'updatedAt']
    });
}

export const findUserByEmail = async (email: string, exclude: string) => {
    return await User.findOne({
        attributes: {
            exclude: [exclude]
        },
        where: { email },
    });
}

