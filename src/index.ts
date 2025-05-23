import express from "express";

import { sequelize } from "./config/db.config.js";
import { router as todoRouter } from "./routes/todo.routes.js";
import { tryCatch } from "./util/common.util.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const [err, _] = await tryCatch(
  Promise.all([sequelize.authenticate(), sequelize.sync()]),
);

if (err) {
  console.error("Unable to connect to the database:", err);
  process.exit(1);
}

console.log("Connection has been established successfully.");

app.use("/api/todo", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
