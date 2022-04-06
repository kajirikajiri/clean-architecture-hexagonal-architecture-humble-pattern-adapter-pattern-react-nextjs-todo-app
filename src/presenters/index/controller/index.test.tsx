import { renderHook, act } from "@testing-library/react-hooks";
import { mockTodoRepository as todoRepository } from "src/core/frameworksAndDrivers/mock/todo";
import { injectTodoDependency } from "src/core/usecases/interactors/todo";
import { useController } from "src/presenters/index/controller";

const todoInteractor = injectTodoDependency(todoRepository);

test(`onload:描画される値が正しいこと`, () => {
  const { result } = renderHook(() => useController());
  act(() => {
    const [_, dispatch] = result.current;
    dispatch({
      type: "onload",
      payload: {
        todos: [
          {
            id: "1",
            title: "title",
            description: "description",
            createdAt: "",
            doneAt: "",
            updatedAt: "",
          },
        ],
        mode: "readable",
      },
      meta: {
        dispatch,
        todoInteractor,
      },
    });
  });
  expect(result.current[0].state.todos).toEqual([
    {
      id: "1",
      title: "title",
      description: "description",
      createdAt: "",
      doneAt: "",
      updatedAt: "",
    },
  ]);
});

test(`handleClear:描画される値が正しいこと`, () => {
  const { result } = renderHook(() => useController());
  act(() => {
    const [state, dispatch] = result.current;
    dispatch({
      type: "onload",
      payload: {
        todos: [
          {
            id: "1",
            title: "title",
            description: "description",
            createdAt: "",
            doneAt: "",
            updatedAt: "",
          },
        ],
        mode: "readable",
      },
      meta: {
        dispatch,
        todoInteractor,
      },
    });
    state.todosEventHandler?.handleClear &&
      state.todosEventHandler.handleClear("1");
  });
  expect(result.current[0].state.todos).toEqual([
    {
      id: "1",
      title: "",
      description: "",
      createdAt: "",
      doneAt: "",
      updatedAt: "",
    },
  ]);
});

test(`handleChangeDescription:描画される値が正しいこと`, () => {
  const { result } = renderHook(() => useController());
  act(() => {
    const [state, dispatch] = result.current;
    dispatch({
      type: "onload",
      payload: {
        todos: [
          {
            id: "1",
            title: "",
            description: "fuga",
            createdAt: "",
            doneAt: "",
            updatedAt: "",
          },
        ],
        mode: "readable",
      },
      meta: {
        dispatch,
        todoInteractor,
      },
    });
    state.todosEventHandler?.handleChangeDescription &&
      state.todosEventHandler.handleChangeDescription("1", "new description");
  });
  expect(result.current[0].state.todos).toEqual([
    {
      id: "1",
      title: "",
      description: "new description",
      createdAt: "",
      doneAt: "",
      updatedAt: "",
    },
  ]);
});
