import { Request, Response } from "express";
import { CreateTodoSchema, Todo, UpdateTodoSchema } from "../model/todo.model";

type ControllerFn = (req: Request, res: Response) => void;

export const getAllTodos: ControllerFn = async (req, res) => {
  const todos = await Todo.findAll();
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

  const todo = await Todo.create({ title, description });
  res.json(todo);
};

export const getTodo: ControllerFn = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const todo = await Todo.findByPk(id);
  res.json(todo);
};

export const updateTodo: ControllerFn = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const { title, description } = UpdateTodoSchema.parse(req.body);

  const todo = await Todo.update({ title, description }, { where: { id } });

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

  const todo = await Todo.update({ completed }, { where: { id } });
  res.json(todo);
};
