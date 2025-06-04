import { Todo } from "@/database/interfaces.types";
import TodoCard from "@/features/todos/components/todo-card";
import { useFilteredTodo } from "@/features/todos/hooks/use-filtered-todo";

export type TodoType = "all" | "completed" | "overdue" | "active";
const TodoList = ({ data, type }: { data: Todo[]; type: TodoType }) => {
  const filteredData = useFilteredTodo(data, type);
  return (
    <div
      className={
        "max-h-[calc(100vh-400px)] overflow-y-scroll pr-2 flex flex-col gap-y-4 md:max-h-[calc(100vh-300px)]"
      }
    >
      {filteredData.map((item) => (
        <TodoCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoList;
