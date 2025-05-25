export const dynamic = "force-dynamic";

import { getTodos } from "@/features/to-do/actions/todo-action";
import TodoHomePage from "@/features/to-do/components/todo-homepage";
import { TodoSchema } from "@/features/to-do/types/todo-schema";

const page = async () => {
  const { success } = await getTodos();

  const todos: TodoSchema[] = success
    ? success.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description ?? undefined,
        dueAt: todo.dueAt!,
        priority: String(todo.priority),
        status: todo.status ?? "PENDING",
        createdAt: todo.createdAt,
      }))
    : [];

  return <TodoHomePage todos={todos} />;
};

export default page;
