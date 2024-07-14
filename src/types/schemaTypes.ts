import {readdir} from "node:fs";

type Priority = 1 | 2 | 3 | 4 | 5;

export interface TTodoSchema {
    author: string,
    content: string,
    isFinished: boolean;
    createdAt?: number;
    dueAt?: number;
    finishedAt?: number;
    priority?: Priority;
}

export interface TUserSchema {
    username: string,
    email: string,
    password: string,
}

export type QueryInterface<T> = T & { _id: string, __v: number }

type DateType = "createdAt" | "dueAt" | "finishedAt";
export type QueryType = DateType | "isFinished" | "priority";

type TodoQueryType<T extends QueryType> = Extract<keyof TTodoSchema, T>;


export type TodoSearchQuery<T extends QueryType> =
    { queryType: TodoQueryType<T> }
    & {
    equal: string | undefined,
    gt: string | undefined
    lt: string | undefined, };
