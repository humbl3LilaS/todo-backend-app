import express from "express";
import {getAllTodos} from "../service/TodosServices";



const todoRouter = express();

todoRouter.get("/", async (req, res) => {
        const todos = await getAllTodos();
        res.status(200).send(todos);
    }
);


export {todoRouter}
