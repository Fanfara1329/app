import { DataTypes } from "sequelize";
import { db } from "./connectToDb.js";

export const Event = db.define(
  "event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tema: DataTypes.STRING,
    descripshion_sh: DataTypes.STRING,
    descripshion: DataTypes.STRING,
    photo: DataTypes.IM
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "users",
  }
);