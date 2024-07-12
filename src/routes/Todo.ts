import express from "express";
import {
    createTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController
} from "../controller/todoControllers";


const todoRouter = express();

todoRouter.get("/", getAllTodosController);

todoRouter.get("/:id", getTodoByIdController);

todoRouter.post("/", createTodoController);

todoRouter.put("/:id", updateTodoController);

export {todoRouter};
