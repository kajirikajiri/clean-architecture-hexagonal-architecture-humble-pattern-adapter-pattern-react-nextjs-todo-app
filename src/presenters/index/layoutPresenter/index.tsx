import { Header, HeaderProps } from "presenters/index/layoutPresenter/header"
import { Todos, TodosProps } from "presenters/index/layoutPresenter/todo"

type Props = {
    todosProps: TodosProps
    headerProps: HeaderProps
}
export function LayoutPresenter(props: Props) {
    return <>
        <Header {...props.headerProps} />
        <Todos {...props.todosProps} />
    </>
}