import { ITodoDependencyInJector } from "src/core/usecases/interfaces/todo"

export const injectTodoDependency: ITodoDependencyInJector = (r) => ({
    getAll: () => {
        return r.get()
    },
    get: (id) => {
        const todos = r.get()
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }

        return todo
    },
    create: (title, description) => {
        return r.create(title, description)
    },
    update: (id, todo) => {
        return r.update(id, todo)
    },
    delete: (id) => {
        return r.delete(id)
    },
    clone: (id) => {
        const todos = r.get()
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }
        const newTodo = r.create('', '')
        newTodo.title = todo.title
        newTodo.description = todo.description
        newTodo.createdAt = todo.createdAt
        newTodo.updatedAt = todo.updatedAt
        newTodo.doneAt = todo.doneAt
        r.update(newTodo.id, newTodo)
        return todos
    }
})
