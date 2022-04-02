import { Todo } from "core/entities/todo"
import { cookieTodoRepository as repository } from "core/frameworksAndDrivers/web/js-cookie/todo"
import { todoInteractor } from "core/usecases/interactors/todo"
import { useController } from "presenters/index/controller"
import { LayoutPresenter } from "presenters/index/layoutPresenter"
import { HeaderProps } from "presenters/index/layoutPresenter/header"
import { TodosProps } from "presenters/index/layoutPresenter/todo"

export type PageProps = {
    todos: Todo[] | undefined
}
export default function Page () {
    
    const [state, dispatch] = useController()
    if (state.todos === undefined) {
        dispatch({
            type: 'onload',
            payload: {
                todos: todoInteractor.getAllTodo(repository)
            }
        })
    }
    const todosProps: TodosProps = {
        todos: state.todos,
        handleClone: (id) => {
            const todos = todoInteractor.cloneTodo(repository, id)
            dispatch({
                type: 'clone',
                payload: {
                    todos,
                }
            })
        },
        handleDelete: (id) => {
            const todos = todoInteractor.deleteTodo(repository, id)
            dispatch({
                type: 'delete',
                payload: {
                    todos,
                }
            })
        },
        handleChangeDescription: (id, description) => {
            const todo = todoInteractor.updateTodo(repository, id, {description})
            dispatch({
                type: 'updateDescription',
                payload: {
                    id,
                    todo,
                }
            })
        },
        handleChangeTitle: (id, title) => {
            const todo = todoInteractor.updateTodo(repository, id, {title})
            dispatch({
                type: 'updateTitle',
                payload: {
                    id,
                    todo,
                }
            })
        },
        handleClear: (id) => {
            const todo = todoInteractor.updateTodo(repository, id, {title: '', description: ''})
            dispatch({
                type: 'clear',
                payload: {
                    id,
                    todo,
                }
            })
        }
    }
    const headerProps: HeaderProps = {
        handleAdd: () => {
            const todo = todoInteractor.createTodo(repository, '', '')
            dispatch({
                type: 'add',
                payload: {
                    todo,
                }
            })
        }
    }
    return <>
        <LayoutPresenter todosProps={todosProps} headerProps={headerProps}/>
    </>
}