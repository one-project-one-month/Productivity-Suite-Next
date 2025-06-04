import { Todo } from "@/database/interfaces.types";
import TodoCard from "@/features/todos/components/todo-card";
import { useFilteredTodo } from "@/features/todos/hooks/use-filtered-todo";
import { ChartColumnStacked } from "lucide-react";

export type TodoType = "all" | "completed" | "overdue" | "active";
const TodoList = ({ data, type }: { data: Todo[]; type: TodoType }) => {
  const filteredData = useFilteredTodo(data, type);
  return (
    <div
      className={
        "max-h-[calc(100vh-400px)] overflow-y-scroll pr-2 flex flex-col gap-y-4 md:max-h-[calc(100vh-300px)]"
      }
    >
      {filteredData.length === 0 && (
        <div
          className={
            "py-14  mt-4 text-center md:mt-8 border-black/20 dark:border-white/60 border-dashed border-[1.5px] lg:border-2 rounded-xl"
          }
        >
          <div
            role={"presentation"}
            className={
              "aspect-square w-12 mb-2 mx-auto flex items-center justify-center bg-gray-400 rounded-full md:mb-5"
            }
          >
            <ChartColumnStacked className={"text-white"} />
          </div>
          <h2 className={"font-bold text-2xl"}>No {type} tasks Yet</h2>
        </div>
      )}
      {filteredData.length > 0 &&
        filteredData.map((item) => <TodoCard data={item} key={item.id} />)}
    </div>
  );
};

export default TodoList;
