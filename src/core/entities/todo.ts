export type Todo = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    doneAt: Date | null;
}