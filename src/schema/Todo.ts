import mongoose from "mongoose";
import {TTodoSchema} from "../types/schemaTypes";

const todosSchema = new mongoose.Schema<TTodoSchema>({
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    isFinished: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    finishedAt: {
        type: Number,
    },
    dueAt: {
        type: Number,
    }
});

export const Todo = mongoose.model("Todos", todosSchema);