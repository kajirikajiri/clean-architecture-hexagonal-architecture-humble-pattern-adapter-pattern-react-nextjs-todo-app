import { Header, HeaderProps } from "src/presenters/index/layoutPresenter/header"
import { Todos, TodosProps } from "src/presenters/index/layoutPresenter/todo"

type Props = {
    todosProps?: TodosProps
    headerProps?: HeaderProps
}
export function LayoutPresenter(props: Props) {
    return <>
        <Header {...props.headerProps} />
        <Todos {...props.todosProps} />
    </>
}