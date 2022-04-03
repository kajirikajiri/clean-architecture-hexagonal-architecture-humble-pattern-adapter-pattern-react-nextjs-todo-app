import { Todo } from "src/core/entities/todo"

export type TodosProps = {
    todos?: Todo[] | undefined
    handleDelete?: (id: Todo['id']) => void
    handleClear?: (id: Todo['id']) => void
    handleClone?: (id: Todo['id']) => void
    handleChangeTitle?: (id: Todo['id'], title: Todo['title']) => void
    handleChangeDescription?: (id: Todo['id'], description: Todo['description']) => void
}
export const Todos = (props?: TodosProps) => {
    return <>
        {
            props?.todos?.map(todo => (
                <div key={todo.id}>
                    <input onChange={(e) => props.handleChangeTitle && props.handleChangeTitle(todo.id, e.target.value)} value={todo.title}/>
                    <input onChange={(e) => props.handleChangeDescription && props.handleChangeDescription(todo.id, e.target.value)} value={todo.description}/>
                    {(Array.isArray(props.todos) && props.todos?.length > 1) ?
                    <button onClick={() => props.handleDelete && props.handleDelete(todo.id)}>delete</button>
                    :
                    <button onClick={() => props.handleClear && props.handleClear(todo.id)}>clear</button>}
                    <button onClick={() => props.handleClone && props.handleClone(todo.id)}>clone</button>
                </div>
            ))
        }
    </>
}