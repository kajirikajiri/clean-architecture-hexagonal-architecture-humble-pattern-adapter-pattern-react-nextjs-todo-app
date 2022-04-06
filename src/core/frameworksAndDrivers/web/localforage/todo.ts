import localforage from "localforage";
import { v4 } from "uuid";
import { Todo } from "src/core/entities/todo";
import { IPromiseTodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo";
import { getFormatDate } from "src/utils/scripts/getFormatDate";

export const cookieTodoRepository: IPromiseTodoRepository = {
  get: async () => {
    let todos: Todo[] = [];
    try {
      todos =
        (JSON.parse((await localforage.getItem("todos")) as any) as Todo[]) ||
        [];
    } catch (error) {
      console.error(error);
    }
    return todos;
  },
  create: async (title, description) => {
    let todos: Todo[] = [];
    try {
      todos =
        (JSON.parse((await localforage.getItem("todos")) as any) as Todo[]) ||
        [];
    } catch (error) {
      console.error(error);
    }
    const date = getFormatDate();
    const todo = {
      id: v4(),
      title,
      description,
      createdAt: date,
      updatedAt: date,
      doneAt: undefined,
    };
    todos.push(todo);
    await localforage.setItem("todos", JSON.stringify(todos));
    return todo;
  },
  update: async (id, todo) => {
    const todos = JSON.parse(
      (await localforage.getItem("todos")) as any
    ) as Todo[];
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("todo not found");
    }
    todos[index] = { ...todos[index], ...todo };
    await localforage.setItem("todos", JSON.stringify(todos));
    return todos[index];
  },
  delete: async (id) => {
    const todos = JSON.parse(
      (await localforage.getItem("todos")) as any
    ) as Todo[];
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }

    todos.splice(todos.indexOf(todo), 1);
    await localforage.setItem("todos", JSON.stringify(todos));
    return todos;
  },
};
