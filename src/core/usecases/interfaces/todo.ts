import { Todo } from "core/entities/todo"
import { ITodoRepository } from "core/frameworksAndDrivers/interfaces/todo"

export type GetAllTodo = (r: ITodoRepository) => Todo[]
export type GetTodo = (r: ITodoRepository, id: Todo['id']) => Todo
export type CreateTodo = (r: ITodoRepository, title: Todo['title'], description: Todo['description']) => Todo
export type UpdateTodo = (r: ITodoRepository, id: Todo['id'], todo: Partial<Omit<Todo, 'id'>>) => Todo
export type DeleteTodo = (r: ITodoRepository, id: Todo['id']) => Todo[]
export type CloneTodo = (r: ITodoRepository, id: Todo['id']) => Todo[]