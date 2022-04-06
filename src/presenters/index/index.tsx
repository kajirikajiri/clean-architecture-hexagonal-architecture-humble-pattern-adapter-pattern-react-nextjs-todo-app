import { Todo } from "src/core/entities/todo";
import { cookieTodoRepository as todoRepository } from "src/core/frameworksAndDrivers/web/js-cookie/todo";
import { injectTodoDependency } from "src/core/usecases/interactors/todo";
import { useController } from "src/presenters/index/controller";
import { Template } from "src/presenters/index/template";
import { HeaderProps } from "src/presenters/index/template/organism/header";
import { TodosProps } from "src/presenters/index/template/organism/todo";

export type PageProps = {
  state: {
    todos: Todo[] | undefined;
    mode: "readable" | "writable" | "readable:select" | undefined;
    selectedTodoIds: Todo["id"][] | undefined;
  };
  headerEventHandler: HeaderProps["eventHandler"];
  todosEventHandler: TodosProps["eventHandler"];
};

export default function Page() {
  const [state, dispatch] = useController();
  if (state.state.todos === undefined) {
    const todoInteractor = injectTodoDependency(todoRepository);
    dispatch({
      type: "onload",
      payload: {
        todos: todoInteractor.getAll(),
        mode: "readable",
      },
      meta: {
        dispatch,
        todoInteractor,
      },
    });
  }
  return (
    <>
      <Template
        todosProps={{
          eventHandler: state.todosEventHandler,
          state: state.state,
        }}
        headerProps={{
          eventHandler: state.headerEventHandler,
          state: state.state,
        }}
      />
    </>
  );
}
