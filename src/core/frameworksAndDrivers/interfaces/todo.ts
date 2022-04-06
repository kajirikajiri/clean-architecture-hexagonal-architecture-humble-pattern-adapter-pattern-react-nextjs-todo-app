import { Todo } from "src/core/entities/todo";

export type ITodoRepository = {
  get: () => Todo[];
  create: (title: string, description: string) => Todo;
  update: (id: Todo["id"], todo: Partial<Omit<Todo, "id">>) => Todo;
  delete: (id: Todo["id"]) => Todo[];
};

export type IPromiseTodoRepository = {
  get: () => Promise<Todo[]>;
  create: (title: string, description: string) => Promise<Todo>;
  update: (id: Todo["id"], todo: Partial<Omit<Todo, "id">>) => Promise<Todo>;
  delete: (id: Todo["id"]) => Promise<Todo[]>;
};
