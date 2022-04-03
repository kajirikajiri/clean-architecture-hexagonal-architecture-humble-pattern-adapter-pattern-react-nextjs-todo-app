import { Todo } from "src/core/entities/todo"

export type ITodoRepository = {
    getAll: () => Todo[]
    get: (id: Todo['id']) => Todo
    create: (title: string, description: string) => Todo
    update: (id: Todo['id'], todo: Partial<Omit<Todo, 'id'>>) => Todo
    delete: (id: Todo['id']) => Todo[]
    clone: (id: Todo['id']) => Todo[]
}
