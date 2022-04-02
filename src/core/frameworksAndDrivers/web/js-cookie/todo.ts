import { Todo } from 'core/entities/todo'
import { ITodoRepository } from 'core/frameworksAndDrivers/interfaces/todo'
import Cookies from 'js-cookie'
import { getFormatDate } from 'utils/scripts/getFormatDate'
import { v4 } from 'uuid'

export const cookieTodoRepository: ITodoRepository = {
    getAll: () => {
        let todos: Todo[] = []
        try {
            todos = JSON.parse(Cookies.get('todos') as any) as Todo[] || []
        } catch (error) {
            console.error(error)
        }
        return todos
    },
    get: (id) => {
        const todos = JSON.parse(Cookies.get('todos') as any) as Todo[]
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }
        
        return todo
    },
    create: (title, description) => {
        let todos: Todo[] = []
        try {
            todos = JSON.parse(Cookies.get('todos') as any) as Todo[] || []
        } catch (error) {
            console.error(error)
        }
        const date = getFormatDate()
        const todo = {
            id: v4(),
            title,
            description,
            createdAt: date,
            updatedAt: date,
            doneAt: undefined,
        }
        todos.unshift(todo)
        Cookies.set('todos', JSON.stringify(todos))
        return todo
    },
    update: (id, todo) => {
        const todos = JSON.parse(Cookies.get('todos') as any) as Todo[]
        console.log(todos, todo)
        const index = todos.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error('todo not found')
        }
        todos[index] = {...todos[index], ...todo}
        Cookies.set('todos', JSON.stringify(todos))
        return todos[index]
    },
    delete: (id) => {
        const todos = JSON.parse(Cookies.get('todos') as any) as Todo[]
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }
        
        todos.splice(todos.indexOf(todo), 1)
        Cookies.set('todos', JSON.stringify(todos))
        return todos
    },
    clone: (id) => {
        const todos = JSON.parse(Cookies.get('todos') as any) as Todo[]
        const todo = todos.find(t => t.id === id)
        if (todo === undefined) {
            throw new Error('todo not found')
        }
        todos.unshift({
            ...todo,
            id: v4(),
        })
        Cookies.set('todos', JSON.stringify(todos))
        return todos
    }
}