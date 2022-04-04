import { Todo } from "src/core/entities/todo";
import { ITodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo";

export const mockTodoRepository: ITodoRepository = {
    clone: (id: string) => {
        return [
            {
            id: id,
            title: '',
            description: '',
            createdAt: '',
            doneAt: '',
            updatedAt: '',
        }]
    },
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
    get: (id: string) => {
        return {
            id,
            title: '',
            description: '',
            createdAt: '',
            doneAt: '',
            updatedAt: '',
        }
    },
    getAll: () => {
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
        console.log(57,todo.description)
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
