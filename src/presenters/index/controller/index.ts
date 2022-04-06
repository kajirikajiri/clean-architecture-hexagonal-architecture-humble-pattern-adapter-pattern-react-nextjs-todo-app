import { Dispatch, useReducer } from "react";
import { Todo } from "src/core/entities/todo";
import { ITodoInteractor } from "src/core/usecases/interfaces/todo";
import { PageProps as OutputPort, PageProps } from "src/presenters/index";

export type Action =
  | OnloadAction
  | DeleteAction
  | CloneAction
  | UpdateTitleAction
  | UpdateDescriptionAction
  | AddAction
  | ClearAction
  | ToggleReadOnlyAction
  | SelectTodoAction
  | SetReadOnlyAction
  | SetReadOnlySelectAction
  | MultipleCloneAction
  | MultipleDeleteAction;

type OnloadAction = {
  type: "onload";
  payload: {
    todos: Todo[];
    mode: PageProps["state"]["mode"];
  };
  meta: {
    dispatch: Dispatch<Action>;
    todoInteractor: ITodoInteractor;
  };
};

type DeleteAction = {
  type: "delete";
  payload: {
    todos: Todo[];
  };
};

type CloneAction = {
  type: "clone";
  payload: {
    todos: Todo[];
  };
};

type UpdateDescriptionAction = {
  type: "updateDescription";
  payload: {
    id: string;
    todo: Todo;
  };
};

type UpdateTitleAction = {
  type: "updateTitle";
  payload: {
    id: string;
    todo: Todo;
  };
};

type ClearAction = {
  type: "clear";
  payload: {
    id: string;
    todo: Todo;
  };
};

type AddAction = {
  type: "add";
  payload: {
    todo: Todo;
  };
};

type ToggleReadOnlyAction = {
  type: "toggleReadOnly";
};

type SetReadOnlyAction = {
  type: "setReadOnly";
};

type SetReadOnlySelectAction = {
  type: "setReadOnlySelect";
};

type SelectTodoAction = {
  type: "selectTodo";
  payload: {
    id: Todo["id"];
  };
};

type MultipleDeleteAction = {
  type: "multipleDelete";
  payload: {
    todos: Todo[];
  };
};

type MultipleCloneAction = {
  type: "multipleClone";
  payload: {
    todos: Todo[];
  };
};

const reducer = (state: OutputPort, action: Action): OutputPort => {
  if (action.type === "onload") {
    const { todoInteractor, dispatch } = action.meta;
    state.state.selectedTodoIds = [];
    state.state.mode = action.payload.mode;
    state.state.todos = action.payload.todos;
    state.headerEventHandler = {
      handleAdd: () => {
        const todo = todoInteractor.create("", "");
        dispatch({
          type: "add",
          payload: {
            todo,
          },
        });
      },
      handleToggleReadOnly: () => {
        dispatch({
          type: "toggleReadOnly",
        });
      },
      handleSetReadOnly: () => {
        dispatch({
          type: "setReadOnly",
        });
      },
      handleSetReadOnlySelect: () => {
        dispatch({
          type: "setReadOnlySelect",
        });
      },
      handleMultipleClone: () => {
        state.state.selectedTodoIds?.forEach((id) => {
          todoInteractor.clone(id);
        });
        const todos = todoInteractor.getAll();
        dispatch({
          type: "multipleClone",
          payload: {
            todos,
          },
        });
      },
      handleMultipleDelete: () => {
        state.state.selectedTodoIds?.forEach((id) => {
          todoInteractor.delete(id);
        });
        const todos = todoInteractor.getAll();
        dispatch({
          type: "multipleDelete",
          payload: {
            todos,
          },
        });
      },
    };
    state.todosEventHandler = {
      handleClone: (id) => {
        const todos = todoInteractor.clone(id);
        dispatch({
          type: "clone",
          payload: {
            todos,
          },
        });
      },
      handleDelete: (id) => {
        const todos = todoInteractor.delete(id);
        dispatch({
          type: "delete",
          payload: {
            todos,
          },
        });
      },
      handleChangeDescription: (id, description) => {
        const todo = todoInteractor.update(id, { description });
        dispatch({
          type: "updateDescription",
          payload: {
            id,
            todo,
          },
        });
      },
      handleChangeTitle: (id, title) => {
        const todo = todoInteractor.update(id, { title });
        dispatch({
          type: "updateTitle",
          payload: {
            id,
            todo,
          },
        });
      },
      handleClear: (id) => {
        const todo = todoInteractor.update(id, { title: "", description: "" });
        dispatch({
          type: "clear",
          payload: {
            id,
            todo,
          },
        });
      },
      handleSelectTodo: (id) => {
        dispatch({
          type: "selectTodo",
          payload: {
            id,
          },
        });
      },
    };
    return state;
  }
  if (
    state.state.todos === undefined ||
    state.state.selectedTodoIds === undefined
  ) {
    console.error("state.todos is undefined not allow");
    return state;
  }

  if (action.type === "delete" || action.type === "clone") {
    state.state.todos = action.payload.todos;
    return {
      ...state,
    };
  }
  if (
    action.type === "updateTitle" ||
    action.type === "updateDescription" ||
    action.type === "clear"
  ) {
    const index = state.state.todos.findIndex(
      (todo) => todo.id === action.payload.id
    );
    if (index === -1) {
      console.error("todo not found");
      return state;
    }
    state.state.todos[index] = action.payload.todo;
    return {
      ...state,
    };
  }
  if (action.type === "add") {
    state.state.todos.push(action.payload.todo);
    return {
      ...state,
    };
  }
  if (action.type === "toggleReadOnly") {
    state.state.mode = (() => {
      if (state.state.mode === "readable") return "writable";
      if (state.state.mode === "writable") return "readable";
      console.error(`action.type === 'onload'で初期化`);
    })();
    return {
      ...state,
    };
  }
  if (action.type === "setReadOnly") {
    state.state.mode = "readable";
    return {
      ...state,
    };
  }
  if (action.type === "setReadOnlySelect") {
    state.state.mode = "readable:select";
    return {
      ...state,
    };
  }
  if (action.type === "selectTodo") {
    state.state.selectedTodoIds = (() => {
      if (state.state.selectedTodoIds.includes(action.payload.id)) {
        return state.state.selectedTodoIds.filter(
          (id) => id !== action.payload.id
        );
      } else {
        return [...state.state.selectedTodoIds, action.payload.id];
      }
    })();
    return {
      ...state,
    };
  }
  if (action.type === "multipleDelete") {
    state.state.todos = action.payload.todos;
    state.state.selectedTodoIds = [];
    return {
      ...state,
    };
  }
  if (action.type === "multipleClone") {
    state.state.todos = action.payload.todos;
    state.state.selectedTodoIds = [];
    return {
      ...state,
    };
  }
  console.error("error");
  return state;
};

const initialState: OutputPort = {
  headerEventHandler: {
    handleAdd: undefined,
    handleToggleReadOnly: undefined,
  },
  state: {
    mode: undefined,
    todos: undefined,
    selectedTodoIds: undefined,
  },
  todosEventHandler: {
    handleChangeDescription: undefined,
    handleChangeTitle: undefined,
    handleClear: undefined,
    handleClone: undefined,
    handleDelete: undefined,
  },
};

export const useController = (): [OutputPort, Dispatch<Action>] =>
  useReducer(reducer, initialState);
