import {Request, Response} from "express";
import {createTodo, getAllTodos} from "../service/TodosServices";
import mongoose from "mongoose";

export const getAllTodosController = async (req: Request, res: Response) => {
    try {
        const allTodos = await getAllTodos();
        return res.status(200).json(allTodos);
    } catch (e) {
        if (e instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(404).json({error: e.result});
        } else {
            res.status(404).json({error: "Content Not Found"})
        }
    }
};

export const createTodoController = async (req: Request, res: Response) => {
    try {
        const {content, finishedAt, dueAt, isFinished, priority, createdAt} = req.body;
        const storedTodo = await createTodo({content, finishedAt, dueAt, isFinished, priority, createdAt});
        if (!storedTodo) {
            res.sendStatus(400).json({error: "Bad request: Creation Failed"});
        } else {
            res.status(201).json(storedTodo);
        }
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            let error = e.errors["content"] as mongoose.Error.ValidatorError;
            res.status(400).json({error: error.properties.message});
        } else {
            res.status(400).json({error: "Bad request: Creation Failed"});
        }
    }
};