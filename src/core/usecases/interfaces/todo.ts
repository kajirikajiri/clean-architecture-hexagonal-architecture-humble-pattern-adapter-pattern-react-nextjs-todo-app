import { Todo } from "src/core/entities/todo";
import {
  IPromiseTodoRepository,
  ITodoRepository,
} from "src/core/frameworksAndDrivers/interfaces/todo";

export type ITodoInteractor = {
  getAll: () => Todo[];
  get: (id: Todo["id"]) => Todo;
  create: (title: Todo["title"], description: Todo["description"]) => Todo;
  update: (id: Todo["id"], todo: Partial<Omit<Todo, "id">>) => Todo;
  delete: (id: Todo["id"]) => Todo[];
  clone: (id: Todo["id"]) => Todo[];
};

export type ITodoDependencyInJector = (r: ITodoRepository) => ITodoInteractor;

export type IPromiseTodoInteractor = {
  getAll: () => Promise<Todo[]>;
  get: (id: Todo["id"]) => Promise<Todo>;
  create: (
    title: Todo["title"],
    description: Todo["description"]
  ) => Promise<Todo>;
  update: (id: Todo["id"], todo: Partial<Omit<Todo, "id">>) => Promise<Todo>;
  delete: (id: Todo["id"]) => Promise<Todo[]>;
  clone: (id: Todo["id"]) => Promise<Todo[]>;
};

export type IPromiseTodoDependencyInJector = (
  r: IPromiseTodoRepository
) => IPromiseTodoInteractor;
