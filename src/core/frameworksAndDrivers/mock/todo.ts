import { Todo } from "src/core/entities/todo";
import { ITodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo";

export const mockTodoRepository: ITodoRepository = {
    create: (title: string, description: string) => {
        return {
            id: '',
            title,
            description,
            createdAt: '',
            doneAt: '',
            updatedAt: '',
        }
    },
    delete: (id: string) => {
        return [{
            id,
            title: '',
            description: '',
            createdAt: '',
            doneAt: '',
            updatedAt: '',
        }]
    },
    get: () => {
        return [{
            id: '',
            title: '',
            description: '',
            createdAt: '',
            doneAt: '',
            updatedAt: '',
        }]
    },
    update: (id: string, todo: Partial<Omit<Todo, "id">>) => {
        return {
            id,
            createdAt: todo.createdAt || '',
            description: todo.description || '',
            doneAt: todo.doneAt || '',
            title: todo.title || '',
            updatedAt: todo.updatedAt || ''
        }
    }
}
