import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.config.js";
import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const CreateTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const UpdateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

interface TodoModel
  extends Model<InferAttributes<TodoModel>, InferCreationAttributes<TodoModel>>,
    z.infer<typeof TodoSchema> {
  id: CreationOptional<number>;
  completed: CreationOptional<boolean>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export const Todo = sequelize.define<TodoModel>("Todo", {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
