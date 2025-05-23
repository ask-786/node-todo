import express from "express";
import {
  changeTodoStatus,
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

export const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodo).patch(updateTodo);
router.route("/:id/change-status").get(getTodo).patch(changeTodoStatus);
