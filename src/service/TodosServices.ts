import {TodoSchema} from "../schema/TodoSchema";

export const getAllTodos = async () => TodoSchema.find({}, undefined, {lean: true, projection: undefined});