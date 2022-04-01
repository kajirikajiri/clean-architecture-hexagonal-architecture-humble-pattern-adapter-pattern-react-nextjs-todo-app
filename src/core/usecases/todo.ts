import { Todo } from "core/entities/todo"
import { ITodoRepository } from "core/frameworksAndDrivers/web/js-cookie/todo"

export type CreateTodo = (r: ITodoRepository, title: string, description: string) => Todo