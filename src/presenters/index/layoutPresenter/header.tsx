export type HeaderProps = {
    handleAdd: () => void
}
export const Header = (props: HeaderProps) => {
    return <>
        <h1>Todo List</h1><button onClick={props.handleAdd}>add</button>
    </>
}