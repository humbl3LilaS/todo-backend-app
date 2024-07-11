import {Todo} from "../schema/Todo";
import {TTodoSchema} from "../types/schemaTypes";

export const getAllTodos = async () => Todo.find({}, undefined, {lean: true, projection: undefined});

export const createTodo = async (data: TTodoSchema) => {
    const todo = new Todo(data);
    await todo.save();
    return todo;
};