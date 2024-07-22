import {TodoSchema} from "../schema/TodoSchema";
import {QueryType, TodoSearchQuery, TTodoSchema} from "../types/schemaTypes";
import {equal} from "node:assert";

export const getAllTodos = async (authorId: string) => TodoSchema.find({author: authorId}, undefined, {
    lean: true,
    projection: undefined
}).populate("author", "username");

export const getTodoById = async (id: string) => TodoSchema.findById({_id: id}, undefined, {
    lean: true,
    projection: undefined
}).populate("author", "username");

export const getFilteredTodo = async <T extends QueryType>(query: TodoSearchQuery<T>) => {
    console.log(query);
    switch (query.queryType) {
        case "createdAt": {
            if (query.equal) {
                return TodoSchema.find({createdAt: parseInt(query.equal)});
            }
            if (query.gt && query.lt) {
                return TodoSchema.find({createdAt: {$gt: +query.gt, $lt: +query.lt}});
            }
            if (query.gt) {
                return TodoSchema.find({createdAt: {$gt: +query.gt}});
            }
            if (query.lt) {
                return TodoSchema.find({createdAt: {$lt: +query.lt}});
            }
            break;
        }
        default : {
            return {hehe: "super"};
        }
    }

};

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