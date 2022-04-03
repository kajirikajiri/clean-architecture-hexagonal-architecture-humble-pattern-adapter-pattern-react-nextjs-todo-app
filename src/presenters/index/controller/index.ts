import { Todo } from "src/core/entities/todo"
import { PageProps as OutputPort } from "src/presenters/index"
import { Dispatch, useReducer } from "react"
import { TodoInteractor } from "src/core/usecases/interfaces/todo"
import { ITodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo"

export type Action = OnloadAction | DeleteAction | CloneAction | UpdateTitleAction | UpdateDescriptionAction | AddAction | ClearAction

type OnloadAction = {
    type: 'onload'
    payload: {
        todos: Todo[]
    }
    meta: {
        dispatch: Dispatch<Action>
        todoInteractor: TodoInteractor
        todoRepository: ITodoRepository
    }
}

type DeleteAction = {
    type: 'delete'
    payload: {
        todos: Todo[]
    }
}

type CloneAction = {
    type: 'clone'
    payload: {
        todos: Todo[]
    }
}

type UpdateDescriptionAction = {
    type: 'updateDescription'
    payload: {
        id: string
        todo: Todo
    }
}

type UpdateTitleAction = {
    type: 'updateTitle'
    payload: {
        id: string
        todo: Todo
    }
}

type ClearAction = {
    type: 'clear'
    payload: {
        id: string
        todo: Todo
    }
}

type AddAction = {
    type: 'add'
    payload: {
        todo: Todo
    }
}

const reducer = (state: OutputPort, action: Action): OutputPort => {
    if (action.type === 'onload') {
        const{todoInteractor, todoRepository, dispatch} =action.meta
        state.todos = action.payload.todos
        state.headerProps = {
            handleAdd: () => {
                const todo = todoInteractor.createTodo(todoRepository, '', '')
                dispatch({
                    type: 'add',
                    payload: {
                        todo,
                    }
                })
            }
        }
        state.todosActions = {
            handleClone: (id) => {
                const todos = todoInteractor.cloneTodo(todoRepository, id)
                dispatch({
                    type: 'clone',
                    payload: {
                        todos,
                    }
                })
            },
            handleDelete: (id) => {
                const todos = todoInteractor.deleteTodo(todoRepository, id)
                dispatch({
                    type: 'delete',
                    payload: {
                        todos,
                    }
                })
            },
            handleChangeDescription: (id, description) => {
                const todo = todoInteractor.updateTodo(todoRepository, id, { description })
                dispatch({
                    type: 'updateDescription',
                    payload: {
                        id,
                        todo,
                    }
                })
            },
            handleChangeTitle: (id, title) => {
                const todo = todoInteractor.updateTodo(todoRepository, id, { title })
                dispatch({
                    type: 'updateTitle',
                    payload: {
                        id,
                        todo,
                    }
                })
            },
            handleClear: (id) => {
                const todo = todoInteractor.updateTodo(todoRepository, id, { title: '', description: '' })
                dispatch({
                    type: 'clear',
                    payload: {
                        id,
                        todo,
                    }
                })
            }
        }
        return state
    }
    if (state.todos === undefined) {
        console.error('state.todos is undefined not allow')
        return state
    }

    if (action.type === 'delete' || action.type === 'clone') {
        state.todos = action.payload.todos
        return {
            ...state,
        }
    }
    if (action.type === 'updateTitle' || action.type === 'updateDescription' || action.type === 'clear') {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id)
        if (index === -1) {
            console.error('todo not found')
            return state
        }
        state.todos[index] = action.payload.todo
        return {
            ...state,
        }
    }
    if (action.type === 'add') {
        state.todos.push(action.payload.todo)
        return {
            ...state,
        }
    }
    throw Error('')
}

const initialState: OutputPort = {
    todos: undefined,
    headerProps: undefined,
    todosActions: undefined,
}

export const useController = (): [OutputPort, Dispatch<Action>] => useReducer(reducer, initialState)
