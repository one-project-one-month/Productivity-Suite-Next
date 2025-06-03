import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Todos from "@/features/todos/components/todos";
import { getAllTodos } from "@/features/todos/actions/get-all-todos";
import { notFound } from "next/navigation";
import NewTodoDialog from "@/features/todos/components/new-todo-dialog";

const TodoPage = async () => {
  const todos = await getAllTodos();
  if (!todos) {
    return notFound();
  }
  return (
    <section>
      <Card
        className={"max-w-[800px] mt-8 mx-auto bg-card text-muted-foreground"}
      >
        <CardHeader className={"flex justify-between"}>
          <div>
            <CardTitle
              className={"text-black dark:text-muted-foreground font-bold"}
            >
              Task Manager
            </CardTitle>
            <CardDescription>
              Track your tasks, priorities, and deadlines
            </CardDescription>
          </div>
          <NewTodoDialog />
        </CardHeader>
        <CardContent>
          <Todos data={todos} />
        </CardContent>
      </Card>
    </section>
  );
};

export default TodoPage;
