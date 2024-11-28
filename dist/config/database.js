import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.POSTGRES_DB || 'default_db', process.env.POSTGRES_USER || 'postgres', process.env.POSTGRES_PASSWORD || 'password', {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
});
export default sequelize;
