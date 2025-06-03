import { Todo } from "@/database/interfaces.types";
import { useTodoFilterStore } from "@/features/todos/hooks/use-todo-filter-store";

export const useFilteredTodo = (payload: Todo[]) => {
  let data = payload;
  const { priority } = useTodoFilterStore();
  if (priority && priority !== "all") {
    data = data.filter((item) => item.priority === priority);
  }
  return data;
};
