import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
    content: {
        type: String,
    }
});

export const TodoSchema = mongoose.model("Todos", todosSchema)