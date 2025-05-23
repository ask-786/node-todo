import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mydb", "myuser", "mypassword", {
  host: "localhost",
  dialect: "postgres",
});
