import { CreateTodo } from "core/usecases/todo";

export const createTodo: CreateTodo = (r, title, description) => {
    return r.create(title, description);
}