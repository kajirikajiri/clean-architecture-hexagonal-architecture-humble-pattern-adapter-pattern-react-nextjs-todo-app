import { Todo } from "src/core/entities/todo"
import { ITodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo"

type GetAll = () => Todo[]
type Get = (id: Todo['id']) => Todo
type Create = (title: Todo['title'], description: Todo['description']) => Todo
type Update = (id: Todo['id'], todo: Partial<Omit<Todo, 'id'>>) => Todo
type Delete = (id: Todo['id']) => Todo[]
type Clone = (id: Todo['id']) => Todo[]

export type ITodoInteractor = {
    getAll: GetAll;
    get: Get;
    create: Create;
    update: Update;
    delete: Delete;
    clone: Clone;
}

export type ITodoDependencyInJector = (r: ITodoRepository) => ITodoInteractor