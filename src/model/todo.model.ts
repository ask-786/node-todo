import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const UpdateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
