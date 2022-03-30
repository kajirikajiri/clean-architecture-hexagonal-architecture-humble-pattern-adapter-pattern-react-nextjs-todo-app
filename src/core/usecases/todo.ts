import { Todo } from "core/domains/models/todo"
import { ITodoRepository } from "core/repositories/todo/cookie"

export type CreateTodo = (r: ITodoRepository, title: string, description: string) => Todo