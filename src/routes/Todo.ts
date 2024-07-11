import express from "express";
import {createTodo, getAllTodos} from "../service/TodosServices";


const todoRouter = express();

todoRouter.get("/", async (req, res) => {
        const todos = await getAllTodos();
        res.status(200).send(todos);
    }
);

todoRouter.post("/", async (req, res) => {
    const {content, finishedAt, dueAt, isFinished, priority, createdAt} = req.body;
    const storedTodo = await createTodo({content, finishedAt, dueAt, isFinished, priority, createdAt});
    if (!storedTodo) {
        res.sendStatus(404).json({error: "Creation failed"});
    } else {
        res.json(storedTodo)
    }
});


export {todoRouter};
