import {Request, Response} from "express";
import {createTodo, deleteTodo, getAllTodos, getFilteredTodo, getTodoById, updateTodo} from "../service/TodosServices";
import mongoose, {ModifyResult} from "mongoose";
import {QueryType, TodoSearchQuery, TTodoSchema} from "../types/schemaTypes";

export const getAllTodosController = async (req: Request, res: Response) => {
    try {
        const queryType = req.query.queryType as QueryType;
        if (queryType) {
            const searchQuery = req.query as TodoSearchQuery<typeof queryType>;
            const result = await getFilteredTodo(searchQuery);
            res.status(200).json(result);
        } else {
            const allTodos = await getAllTodos();
            return res.status(200).json(allTodos);
        }
    } catch (e) {
        if (e instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(404).json({error: e.result});
        } else {
            res.status(404).json({error: "Content Not Found"});
        }
    }
};

export const getTodoByIdController = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const todo = await getTodoById(id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(400).json({error: "Invalid TodoSchema"});
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};

export const createTodoController = async (req: Request, res: Response) => {
    try {
        const {content, finishedAt, dueAt, isFinished, priority, createdAt} = req.body;
        //@ts-ignore
        const author = req!.user.id as string;
        const storedTodo = await createTodo({content, finishedAt, dueAt, isFinished, priority, createdAt, author});
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

        const updatedTodo = await updateTodo(id, updateData) as unknown as ModifyResult<TTodoSchema>;

        if (updatedTodo.lastErrorObject?.updatedExisting) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(400).json({error: "Update Fail"});
        }
    } catch (e) {
        res.send(400).json({error: "failed"});
    }
};


export const deleteTodoController = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deletedTodo = await deleteTodo(id);
        res.status(200).json(deletedTodo);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).json({error: "No such Id"});
        } else {
            res.status(400).json({error: "deletion failed"});
        }
    }
};