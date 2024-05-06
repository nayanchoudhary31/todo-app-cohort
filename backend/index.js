import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { createTodo, updateTodo } from "./types.js";
import { Todo } from "./model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

connectDB();

app.get("/todos", async function (req, resp) {
  try {
    const todo = await Todo.find({});
    return resp.status(200).json({ todos: todo });
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo", async function (req, resp) {
  try {
    const createTodoPayload = req.body;

    const createTodoParsed = createTodo.safeParse(createTodoPayload);

    if (!createTodoParsed.success) {
      throw new Error("Invalid input please try again");
    }

    await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });

    return resp.status(201).json({ msg: `Todo created successfully!` });
  } catch (error) {
    console.log(error);
  }
});

app.put("/completed", async function (req, resp) {
  try {
    const updateTodoPayload = req.body;
    const parsedUpdateTodoPayload = updateTodo.safeParse(updateTodoPayload);

    if (!parsedUpdateTodoPayload.success) {
      throw new Error(`Invalid inputs please try again!`);
    }
    const todoId = await Todo.findById({ _id: req.body.id });

    if (!todoId) {
      resp
        .status(404)
        .json({ msg: `No todo found for this id ${req.body.id}` });
    }

    await Todo.findByIdAndUpdate({ _id: req.body.id }, { isCompleted: true });

    return resp.status(200).json({ msg: `Todo marked as completed!` });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, function () {
  console.log(`Server is up and running on ${PORT}`);
});
