import { Todo } from "core/entities/domains/todo"
import { ITodoRepository } from "core/repositories/todo/cookie"

export type CreateTodo = (r: ITodoRepository, title: string, description: string) => Todo