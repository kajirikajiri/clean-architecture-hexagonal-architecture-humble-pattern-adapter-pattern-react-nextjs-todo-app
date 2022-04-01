import { Todo } from 'core/entities/todo'
import Cookies from 'js-cookie'

export type ITodoRepository = {
    findById: (id: Todo['id']) => Todo
    create: (title: string, description: string) => Todo
}

const cookieTodoRepository: ITodoRepository = {
    findById: (id) => {
        const todos = Cookies.get('todos') as any as Todo[]
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }
        
        return todo
    },
    create: (title, description) => {
        const todos = Cookies.get('todos') as any as Todo[]
        const todo = {
            id: new Date().toISOString(),
            title,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
            doneAt: null,
        }
        todos.push(todo)
        Cookies.set('todos', todos)
        return todo
    }
}
