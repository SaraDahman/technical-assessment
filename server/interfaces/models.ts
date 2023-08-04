import {
    CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    deletedAt?: CreationOptional<Date>;
}

interface IBook extends Model<InferAttributes<IBook>, InferCreationAttributes<IBook>> {
    id: CreationOptional<number>;
    userId?: ForeignKey<IUser['id']>;
    title: string;
    author: string;
    description: string;
    image: string;
    category: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    deletedAt?: CreationOptional<Date>;
}

export {
    IUser,
    IBook
}