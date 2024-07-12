import {Request, Response} from "express";
import {createTodo, getAllTodos, updateTodo} from "../service/TodosServices";
import mongoose from "mongoose";

export const getAllTodosController = async (req: Request, res: Response) => {
    try {
        const allTodos = await getAllTodos();
        return res.status(200).json(allTodos);
    } catch (e) {
        if (e instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(404).json({error: e.result});
        } else {
            res.status(404).json({error: "Content Not Found"});
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

export const updateTodoController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    try {

        const updatedTodo = await updateTodo(id, updateData);
        if (updatedTodo) {
            res.status(200).json({message: "Update Success"});
        }
    } catch (e) {
        res.send(400).json({error: "failed"});
    }
};