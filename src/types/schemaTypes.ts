type Priority = 1 | 2 | 3 | 4 | 5;

export interface TTodoSchema {
    content: string,
    isFinished: boolean;
    createdAt?: number;
    dueAt?: number;
    finishedAt?: number;
    priority?: Priority | 0;
}