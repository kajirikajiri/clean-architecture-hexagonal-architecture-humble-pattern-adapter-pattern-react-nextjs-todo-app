import { PageProps } from "src/presenters/index";

export type HeaderProps = {
  state: {
    mode?: PageProps["state"]["mode"];
  };
  eventHandler: {
    handleAdd?: () => void;
    handleToggleReadOnly?: () => void;
    handleSetReadOnly?: () => void;
    handleSetReadOnlySelect?: () => void;
    handleMultipleDelete?: () => void;
    handleMultipleClone?: () => void;
  };
};

type ToggleReadOnlyButtonProps = {
  mode: PageProps["state"]["mode"];
  handleToggleReadOnly: HeaderProps["eventHandler"]["handleToggleReadOnly"];
};
const ToggleReadOnlyButton = ({
  handleToggleReadOnly,
  mode,
}: ToggleReadOnlyButtonProps) => {
  if (mode === undefined) return <>loading</>;

  return (
    <button onClick={handleToggleReadOnly}>
      {(() => {
        if (mode === "writable") return "now edit";
        if (mode === "readable") return "now read";
        if (mode === "readable:select") return "";
        return "loading";
      })()}
    </button>
  );
};

type AddTodoButtonProps = {
  mode: PageProps["state"]["mode"];
  handleAdd: HeaderProps["eventHandler"]["handleAdd"];
};
const AddTodoButton = ({ mode, handleAdd }: AddTodoButtonProps) => {
  if (mode === undefined) return <button>loading</button>;

  const handdleAdd = () => {
    mode === "writable" && handleAdd && handleAdd();
  };
  return <button onClick={handdleAdd}>{mode === "writable" && "add"}</button>;
};

export const Header = ({
  eventHandler: {
    handleAdd,
    handleToggleReadOnly,
    handleSetReadOnly,
    handleSetReadOnlySelect,
    handleMultipleClone,
    handleMultipleDelete,
  },
  state: { mode },
}: HeaderProps) => {
  return (
    <>
      <h1>Todo List</h1>
      <ToggleReadOnlyButton
        handleToggleReadOnly={handleToggleReadOnly}
        mode={mode}
      />
      <AddTodoButton handleAdd={handleAdd} mode={mode} />
      {mode === "readable:select" ? (
        <button onClick={() => handleSetReadOnly && handleSetReadOnly()}>
          cancel
        </button>
      ) : (
        <button
          onClick={() => handleSetReadOnlySelect && handleSetReadOnlySelect()}
        >
          select
        </button>
      )}
      {mode === "readable:select" ? (
        <button onClick={() => handleMultipleDelete && handleMultipleDelete()}>
          delete
        </button>
      ) : (
        <button></button>
      )}
      {mode === "readable:select" ? (
        <button onClick={() => handleMultipleClone && handleMultipleClone()}>
          clone
        </button>
      ) : (
        <button></button>
      )}
    </>
  );
};
