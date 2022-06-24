import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string),
  models: [__dirname + "/models/*.ts"],
});

module.exports = sequelize
