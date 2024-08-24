import mongoose, {Model} from "mongoose";
import {TTodoSchema} from "../types/schemaTypes";

const todosSchema = new mongoose.Schema<TTodoSchema>({
    // @ts-ignore
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
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
    },
    importance: {
        type: Boolean,
        default: false,
    }
});


type TodoModel = Model<TTodoSchema>

export const TodoSchema = mongoose.model<TTodoSchema, TodoModel>("Todos", todosSchema);