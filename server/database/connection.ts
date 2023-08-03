import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const config = require('./config.js');

dotenv.config();

const { NODE_ENV } = process.env;
let url: any;

switch (NODE_ENV) {
    case 'production':
        url = config[NODE_ENV];
        break;
    case 'development':
        url = config[NODE_ENV];
        break;
    default: throw new Error('invalid database url');
}

const { username, password, database, host, port, dialect, dialectOptions } = url;


const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`, {
    dialect: dialect,
    dialectOptions,
    logging: false,
});

export default sequelize;