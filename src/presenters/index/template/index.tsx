import {
  Header,
  HeaderProps,
} from "src/presenters/index/template/organism/header";
import { Todos, TodosProps } from "src/presenters/index/template/organism/todo";

type Props = {
  todosProps: TodosProps;
  headerProps: HeaderProps;
};
export function Template(props: Props) {
  return (
    <>
      <Header {...props.headerProps} />
      <Todos {...props.todosProps} />
    </>
  );
}
