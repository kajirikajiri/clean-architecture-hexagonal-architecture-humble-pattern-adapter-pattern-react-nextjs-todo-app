import { CloneTodo, CreateTodo, DeleteTodo, GetAllTodo, GetTodo, UpdateTodo } from "core/usecases/interfaces/todo"

const cloneTodo: CloneTodo = (r, id) => {
    return r.clone(id)
}
const createTodo: CreateTodo = (r, title, description) => {
    return r.create(title, description);
}
const deleteTodo: DeleteTodo = (r, id) => {
    return r.delete(id)
}
const getAllTodo: GetAllTodo = (r) => {
    return r.getAll()
}
const getTodo: GetTodo = (r, id) => {
    return r.get(id)
}
const updateTodo: UpdateTodo = (r, id, todo) => {
    return r.update(id, todo)
}
export const todoInteractor = {
    cloneTodo,
    createTodo,
    deleteTodo,
    getAllTodo,
    getTodo,
    updateTodo,
}
