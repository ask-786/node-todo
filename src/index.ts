import express from "express";

import { sequelize } from "./config/db.config";
import { router as todoRouter } from "./routes/todo.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/api/todo", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
