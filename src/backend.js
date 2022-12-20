import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "sqlite.db",
    driver: sqlite3.Database,
  });
}

const db = await openDB();
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  const result = await db.all("SELECT * FROM list");
  res.send(result);
});

app.get("/addItem", async (req, res) => {
  const result = await db.run(
    "INSERT INTO list (name, price) VALUES (:name, :price)",
    {
      ":name": req.query.name,
      ":price": req.query.price,
    }
  );
  res.send(result);
});

app.listen(port);
