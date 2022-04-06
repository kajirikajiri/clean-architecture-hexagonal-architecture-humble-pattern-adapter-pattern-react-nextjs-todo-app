import Cookies from "js-cookie";
import { v4 } from "uuid";
import { Todo } from "src/core/entities/todo";
import { ITodoRepository } from "src/core/frameworksAndDrivers/interfaces/todo";
import { getFormatDate } from "src/utils/scripts/getFormatDate";

export const cookieTodoRepository: ITodoRepository = {
  get: () => {
    let todos: Todo[] = [];
    try {
      todos = (JSON.parse(Cookies.get("todos") as any) as Todo[]) || [];
    } catch (error) {
      console.error(error);
    }
    return todos;
  },
  create: (title, description) => {
    let todos: Todo[] = [];
    try {
      todos = (JSON.parse(Cookies.get("todos") as any) as Todo[]) || [];
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
    Cookies.set("todos", JSON.stringify(todos));

    // おそらくCookieのサイズ上限でCookies.setしたのに、setされない時があるので、再取得して返す
    const newTodos = (JSON.parse(Cookies.get("todos") as any) as Todo[]) || [];
    const newTodo = newTodos.find((t) => t.id === todo.id);
    if (newTodo === undefined) {
      throw new Error("todo not found");
    }

    return newTodo;
  },
  update: (id, todo) => {
    const todos = JSON.parse(Cookies.get("todos") as any) as Todo[];
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("todo not found");
    }
    todos[index] = { ...todos[index], ...todo };
    Cookies.set("todos", JSON.stringify(todos));
    return todos[index];
  },
  delete: (id) => {
    const todos = JSON.parse(Cookies.get("todos") as any) as Todo[];
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      throw new Error("todo not found");
    }

    todos.splice(todos.indexOf(todo), 1);
    Cookies.set("todos", JSON.stringify(todos));
    return todos;
  },
};
