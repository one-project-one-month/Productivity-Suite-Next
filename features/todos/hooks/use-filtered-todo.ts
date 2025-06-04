import { Todo } from "@/database/interfaces.types";
import { useTodoFilterStore } from "@/features/todos/hooks/use-todo-filter-store";
import { TodoType } from "@/features/todos/components/todo-list";
import { isAfter } from "date-fns";

export const useFilteredTodo = (payload: Todo[], type: TodoType) => {
  let data = payload;
  switch (type) {
    case "active":
      data = data.filter((item) => item.completedAt === null);
      break;
    case "completed":
      data = data.filter((item) => item.completedAt !== null);
      break;
    case "overdue":
      data = data.filter(
        (item) => item.dueAt && isAfter(new Date(), item.dueAt),
      );
  }
  const { priority } = useTodoFilterStore();
  if (priority && priority !== "all") {
    data = data.filter((item) => item.priority === priority);
  }
  return data;
};
