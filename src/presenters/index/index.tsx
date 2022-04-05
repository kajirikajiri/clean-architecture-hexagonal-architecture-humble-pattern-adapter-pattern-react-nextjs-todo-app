import { Todo } from "src/core/entities/todo"
import { cookieTodoRepository as todoRepository } from "src/core/frameworksAndDrivers/web/js-cookie/todo"
import { injectTodoDependency } from "src/core/usecases/interactors/todo"
import { useController } from "src/presenters/index/controller"
import { LayoutPresenter } from "src/presenters/index/layoutPresenter"
import { HeaderProps } from "src/presenters/index/layoutPresenter/header"
import { TodosProps } from "src/presenters/index/layoutPresenter/todo"

export type PageProps = {
    todos: Todo[] | undefined
    headerProps: HeaderProps | undefined
    todosActions: Omit<TodosProps, 'todos'> | undefined
}

export default function Page () {
    const [state, dispatch] = useController()
    if (state.todos === undefined) {
        const todoInteractor = injectTodoDependency(todoRepository)
        dispatch({
            type: 'onload',
            payload: {
                todos: todoInteractor.getAll()
            },
            meta: {
                dispatch,
                todoInteractor,
            }
        })
    }
    return <>
        <LayoutPresenter
        todosProps={{...state.todosActions, todos: state.todos}} headerProps={state.headerProps}/>
    </>
}