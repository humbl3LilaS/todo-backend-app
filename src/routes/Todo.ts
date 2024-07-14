import express from "express";
import {
    createTodoController, deleteTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController
} from "../controller/todoControllers";
import {authenticateUser} from "../middleware/AuthenticateUser";


const todoRouter = express();

todoRouter.get("/", authenticateUser, getAllTodosController);

todoRouter.get("/:id", authenticateUser, getTodoByIdController);

todoRouter.post("/", authenticateUser, createTodoController);

todoRouter.put("/:id", authenticateUser, updateTodoController);

todoRouter.delete("/:id", authenticateUser, deleteTodoController);

export {todoRouter};
