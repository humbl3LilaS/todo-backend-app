import express from "express";
import {createTodoController, getAllTodosController} from "../controller/todoControllers";


const todoRouter = express();

todoRouter.get("/", getAllTodosController);

todoRouter.post("/", createTodoController);

export {todoRouter};
