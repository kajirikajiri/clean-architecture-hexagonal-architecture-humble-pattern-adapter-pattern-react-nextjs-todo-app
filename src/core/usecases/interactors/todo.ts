import {
  IPromiseTodoDependencyInJector,
  ITodoDependencyInJector,
} from "src/core/usecases/interfaces/todo";

export const injectTodoDependency: ITodoDependencyInJector = (r) => ({
  getAll: () => {
    return r.get();
  },
  get: (id) => {
    const todos = r.get();
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }

    return todo;
  },
  create: (title, description) => {
    return r.create(title, description);
  },
  update: (id, todo) => {
    return r.update(id, todo);
  },
  delete: (id) => {
    return r.delete(id);
  },
  clone: (id) => {
    const todos = r.get();
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }
    r.create(todo.title, todo.description);
    return r.get();
  },
});

export const injectPromiseTodoDependency: IPromiseTodoDependencyInJector = (
  r
) => ({
  getAll: async () => {
    return await r.get();
  },
  get: async (id) => {
    const todos = await r.get();
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }

    return todo;
  },
  create: async (title, description) => {
    return await r.create(title, description);
  },
  update: async (id, todo) => {
    return await r.update(id, todo);
  },
  delete: async (id) => {
    return await r.delete(id);
  },
  clone: async (id) => {
    const todos = await r.get();
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }
    await r.create(todo.title, todo.description);
    return await r.get();
  },
});
