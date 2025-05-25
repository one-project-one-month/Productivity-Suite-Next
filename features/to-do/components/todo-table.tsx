import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DescriptionDialog } from "./description-dialog";
import { StatusDropdown } from "./status-dropdown";
import { ActionDropdown } from "./action-dropdown";
import { cn } from "@/lib/utils";
import { TodoSchema } from "../types/todo-schema";

type TodoTableProps = {
  todos: TodoSchema[];
  page: number;
};

const TodoTable = ({ todos, page }: TodoTableProps) => {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="font-bold text-foreground dark:text-white">
            <TableCell className="py-4">ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>DueAt</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>StatusActions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length > 0 ? (
            todos.map((todo: TodoSchema, index) => (
              <TableRow key={todo.id}>
                <TableCell className="py-4 text-foreground dark:text-white">
                  {page * 5 + index + 1}
                </TableCell>
                <TableCell
                  className={cn(
                    "px-2 py-1 rounded font-medium text-foreground dark:text-white",
                    todo.status === "COMPLETE" && "strike line-through",
                    todo.status === "OVERDUE" &&
                      "text-destructive dark:text-red-500",
                  )}
                >
                  {todo.title.substring(0, 15) + " ..." || todo.title}
                </TableCell>
                <TableCell>
                  <DescriptionDialog
                    title={todo.title}
                    description={todo.description}
                  />
                </TableCell>
                <TableCell className="text-foreground dark:text-white">
                  {new Date(todo.createdAt!).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-red-600 dark:text-red-400">
                  {new Date(todo.dueAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center text-foreground dark:text-white">
                  {todo.priority == "1"
                    ? "High"
                    : todo.priority == "2"
                      ? "Medium"
                      : "Low"}
                </TableCell>
                <TableCell
                  className={cn(
                    "px-2 py-1 rounded font-medium",
                    todo.status === "PENDING" && "text-yellow-500",
                    todo.status === "COMPLETE" && "text-green-500",
                    todo.status === "OVERDUE" && "text-red-500",
                  )}
                >
                  {todo.status!.charAt(0).toUpperCase() + todo.status!.slice(1)}
                </TableCell>
                <TableCell>
                  <StatusDropdown id={todo.id} />
                </TableCell>
                <TableCell>
                  <ActionDropdown todo={todo} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-red-400 dark:text-red-300"
              >
                There is no task yet! Add a new Todo!.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoTable;
