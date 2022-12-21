import { DataTypes } from "sequelize";
import { db } from "./connectToDb.js.js";

export const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    gender: DataTypes.STRING,
    number: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataType.STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "users",
  }
);