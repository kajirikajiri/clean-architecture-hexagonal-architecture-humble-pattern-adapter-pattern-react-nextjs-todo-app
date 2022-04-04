import { useController } from "src/presenters/index/controller"
import {render} from '@testing-library/react'
import { todoInteractor } from "src/core/usecases/interactors/todo"
import { mockTodoRepository as todoRepository } from "src/core/frameworksAndDrivers/mock/todo"
import { useState } from 'react'
import { useEffect } from "react"

describe(`onload`, () => {
    const Example = () => {
        const [state, dispatch] = useController()
        if (state.todos === undefined) {
            dispatch({
                type: 'onload',
                payload: {
                    todos: [{ id: '1', title: 'hoge', description: 'fuga', createdAt: '', doneAt: '', updatedAt: '' }]
                },
                meta: {
                    dispatch,
                    todoInteractor,
                    todoRepository,
                }
            })
        }
        return <div data-testid="test">{state.todos && JSON.stringify(state.todos)}</div>
    }
    test(`描画される値が正しいこと`, () => {
        const { getByTestId } = render(<Example />)
        expect(getByTestId('test').innerHTML).toEqual(`[{"id":"1","title":"hoge","description":"fuga","createdAt":"","doneAt":"","updatedAt":""}]`)
    })
})

describe(`handleClear`, () => {
    const Example = () => {
        const [state, dispatch] = useController()
        const [executed, setExecuted] = useState(false)
        if (state.todos === undefined) {
            dispatch({
                type: 'onload',
                payload: {
                    todos: [{ id: '1', title: 'hoge', description: 'fuga', createdAt: '', doneAt: '', updatedAt: '' }]
                },
                meta: {
                    dispatch,
                    todoInteractor,
                    todoRepository,
                }
            })
        }
        useEffect(()=>{
            if (!executed && state.todos !== undefined) {
                state.todosActions?.handleClear && state.todosActions.handleClear('1')
                setExecuted(true)
            }
        }, [state.todos])
        return <div data-testid="test">{state.todos && JSON.stringify(state.todos)}</div>
    }
    test(`描画される値が正しいこと`, () => {
        const { getByTestId } = render(<Example />)
        expect(getByTestId('test').innerHTML).toEqual(`[{"id":"1","createdAt":"","description":"","doneAt":"","title":"","updatedAt":""}]`)
    })
})

describe(`handleChangeDescription`, () => {
    const Example = () => {
        const [state, dispatch] = useController()
        const [executed, setExecuted] = useState(false)
        if (state.todos === undefined) {
            dispatch({
                type: 'onload',
                payload: {
                    todos: [{ id: '1', title: 'hoge', description: 'fuga', createdAt: '', doneAt: '', updatedAt: '' }]
                },
                meta: {
                    dispatch,
                    todoInteractor,
                    todoRepository,
                }
            })
        }
        useEffect(()=>{
            if (!executed && state.todos !== undefined) {
                state.todosActions?.handleChangeDescription && state.todosActions.handleChangeDescription('1', 'new description')
                setExecuted(true)
            }
        }, [state.todos])
        console.log(86,state.todos)
        return <div data-testid="test">{state.todos && JSON.stringify(state.todos)}</div>
    }
    test(`描画される値が正しいこと`, () => {
        const { getByTestId } = render(<Example />)
        expect(getByTestId('test').innerHTML).toEqual(`[{"id":"1","createdAt":"","description":"new description","doneAt":"","title":"","updatedAt":""}]`)
    })
})