import { Request, Response } from "express";
import { CreateTodoSchema, Todo, UpdateTodoSchema } from "../model/todo.model.js";
import { tryCatch } from "../util/common.util.js";

type ControllerFn = (req: Request, res: Response) => void;

export const getAllTodos: ControllerFn = async (req, res) => {
  const [err, todos] = await tryCatch(Todo.findAll());

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(todos);
};

export const createTodo: ControllerFn = async (req, res) => {
  const { success, data, error } = CreateTodoSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const { title, description } = data;

  const [err, todo] = await tryCatch(Todo.create({ title, description }));

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(todo);
};

export const getTodo: ControllerFn = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const [err, todo] = await tryCatch(Todo.findByPk(id));

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(todo);
};

export const updateTodo: ControllerFn = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const { data, error, success } = UpdateTodoSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const { title, description } = data;

  const [err, todo] = await tryCatch(
    Todo.update({ title, description }, { where: { id } }),
  );

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(todo);
};

export const changeTodoStatus: ControllerFn = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "completed is required" });
  }

  const [err, todo] = await tryCatch(
    Todo.update({ completed }, { where: { id } }),
  );

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(todo);
};
