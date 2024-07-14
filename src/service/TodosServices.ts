import {Todo} from "../schema/Todo";
import {TTodoSchema} from "../types/schemaTypes";

export const getAllTodos = async () => Todo.find({}, undefined, {lean: true, projection: undefined});

export const getTodoById = async (id: string) => Todo.findById({_id: id}, undefined, {
    lean: true,
    projection: undefined
});

export const createTodo = async (data: TTodoSchema) => {
    const todo = new Todo(data);
    await todo.save();
    return todo;
};

export const updateTodo = async (id: string, data: Partial<TTodoSchema>) => {
    return Todo.findByIdAndUpdate({_id: id}, data, {
        includeResultMetadata: true,
        lean: true,
        projection: undefined,
        new: false,
        runValidators: true
    });
};


export const deleteTodo = async (id: String) => {
    return Todo.findByIdAndDelete(id);
};