import { Todo } from "src/core/entities/todo";
import { PageProps } from "src/presenters/index";

export type TodosProps = {
  state: {
    todos?: Todo[] | undefined;
    mode?: PageProps["state"]["mode"];
    selectedTodoIds?: Todo["id"][] | undefined;
  };
  eventHandler: {
    handleDelete?: (id: Todo["id"]) => void;
    handleClear?: (id: Todo["id"]) => void;
    handleClone?: (id: Todo["id"]) => void;
    handleChangeTitle?: (id: Todo["id"], title: Todo["title"]) => void;
    handleChangeDescription?: (
      id: Todo["id"],
      description: Todo["description"]
    ) => void;
    handleSelectTodo?: (id: Todo["id"]) => void;
  };
};

type InputTitleProps = {
  todo: Todo;
  mode: TodosProps["state"]["mode"];
  handleChangeTitle: TodosProps["eventHandler"]["handleChangeTitle"];
};

const InputTitle = ({ todo, handleChangeTitle, mode }: InputTitleProps) => {
  if (mode === undefined) return <>loading</>;
  return (
    <input
      onChange={(e) =>
        mode === "writable" &&
        handleChangeTitle &&
        handleChangeTitle(todo.id, e.target.value)
      }
      value={todo.title}
    />
  );
};

type InputDescriptionProps = {
  todo: Todo;
  mode: TodosProps["state"]["mode"];
  handleChangeDescription: TodosProps["eventHandler"]["handleChangeDescription"];
};

const InputDescription = ({
  todo,
  handleChangeDescription,
  mode,
}: InputDescriptionProps) => {
  if (mode === undefined) return <>loading</>;
  return (
    <input
      onChange={(e) =>
        mode === "writable" &&
        handleChangeDescription &&
        handleChangeDescription(todo.id, e.target.value)
      }
      value={todo.description}
    />
  );
};

type DeleteButtonProps = {
  todo: Todo;
  mode: TodosProps["state"]["mode"];
  handleDelete: TodosProps["eventHandler"]["handleDelete"];
};

const DeleteButton = ({ todo, handleDelete, mode }: DeleteButtonProps) => {
  if (mode === undefined) return <>loading</>;
  if (mode === "readable") return <button />;
  if (mode === "readable:select") return <button />;
  if (mode === "writable")
    return (
      <button onClick={() => handleDelete && handleDelete(todo.id)}>
        delete
      </button>
    );
  return <></>;
};

type ClearButtonProps = {
  todo: Todo;
  mode: TodosProps["state"]["mode"];
  handleClear: TodosProps["eventHandler"]["handleClear"];
};

const ClearButton = ({ todo, handleClear, mode }: ClearButtonProps) => {
  if (mode === undefined) return <>loading</>;
  if (mode === "readable") return <button />;
  if (mode === "readable:select") return <button />;
  if (mode === "writable")
    return (
      <button onClick={() => handleClear && handleClear(todo.id)}>clear</button>
    );
  return <></>;
};

type CloneButtonProps = {
  todo: Todo;
  mode: TodosProps["state"]["mode"];
  handleClone: TodosProps["eventHandler"]["handleClone"];
};

const CloneButton = ({ todo, handleClone, mode }: CloneButtonProps) => {
  if (mode === undefined) return <>loading</>;
  if (mode === "readable") return <button />;
  if (mode === "readable:select") return <button />;
  if (mode === "writable")
    return (
      <button onClick={() => handleClone && handleClone(todo.id)}>clone</button>
    );
  return <></>;
};

export const Todos = ({
  eventHandler: {
    handleChangeDescription,
    handleChangeTitle,
    handleClear,
    handleClone,
    handleDelete,
    handleSelectTodo,
  },
  state: { mode, todos, selectedTodoIds },
}: TodosProps) => {
  return (
    <>
      {Array.isArray(selectedTodoIds) &&
        todos?.map((todo) => (
          <div key={todo.id}>
            {mode === "readable:select" && (
              <input
                onChange={() => {
                  handleSelectTodo && handleSelectTodo(todo.id);
                }}
                type="checkbox"
              />
            )}
            <InputTitle
              handleChangeTitle={handleChangeTitle}
              mode={mode}
              todo={todo}
            />
            <InputDescription
              todo={todo}
              handleChangeDescription={handleChangeDescription}
              mode={mode}
            />
            {Array.isArray(todos) && todos?.length > 1 ? (
              <DeleteButton
                todo={todo}
                handleDelete={handleDelete}
                mode={mode}
              />
            ) : (
              <ClearButton todo={todo} handleClear={handleClear} mode={mode} />
            )}
            <CloneButton handleClone={handleClone} mode={mode} todo={todo} />
          </div>
        ))}
    </>
  );
};
