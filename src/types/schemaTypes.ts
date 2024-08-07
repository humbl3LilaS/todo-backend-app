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


