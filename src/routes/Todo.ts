import express from "express";
import {createTodoController, getAllTodosController, updateTodoController} from "../controller/todoControllers";


const todoRouter = express();

todoRouter.get("/", getAllTodosController);

todoRouter.post("/", createTodoController);

todoRouter.put("/:id", updateTodoController);

export {todoRouter};
