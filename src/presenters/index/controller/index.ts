import { Todo } from "core/entities/todo"
import { PageProps as OutputPort } from "presenters/index"
import { Dispatch, useReducer } from "react"

export type Action = OnloadAction | DeleteAction | CloneAction | UpdateTitleAction | UpdateDescriptionAction | AddAction | ClearAction

type OnloadAction = {
    type: 'onload'
    payload: {
        todos: Todo[]
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
        state.todos = action.payload.todos
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
    todos: undefined
}

export const useController = (): [OutputPort, Dispatch<Action>] => useReducer(reducer, initialState)
