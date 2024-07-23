import {TodoSchema} from "../schema/TodoSchema";
import {TTodoSchema} from "../types/schemaTypes";

export const getAllTodos = async (authorId: string) => TodoSchema.find({author: authorId}, undefined, {
    lean: true,
    projection: undefined
}).populate("author", "username");

export const getTodoById = async (id: string) => TodoSchema.findById({_id: id}, undefined, {
    lean: true,
    projection: undefined
}).populate("author", "username");

export const createTodo = async (data: TTodoSchema) => {
    const todo = new TodoSchema(data);
    await todo.save();
    return todo;
};

export const updateTodo = async (id: string, data: Partial<TTodoSchema>) => {
    return TodoSchema.findByIdAndUpdate({_id: id}, data, {
        includeResultMetadata: true,
        lean: true,
        projection: undefined,
        new: false,
        runValidators: true
    });
};


export const deleteTodo = async (id: String) => {
    return TodoSchema.findByIdAndDelete(id);
};