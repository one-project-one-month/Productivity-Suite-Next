"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import EditDialogForm from "./edit-dialog-form";
import { TodoSchema } from "../types/todo-schema";
import { useAction } from "next-safe-action/hooks";
import { deleteTodo } from "../actions/todo-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
type todoActionProp = {
  todo: TodoSchema;
};
export const ActionDropdown = (todo: todoActionProp) => {
  const todoData = todo.todo;
  const router = useRouter();

  const { execute } = useAction(deleteTodo, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        router.push("/to-do");
      }
    },
  });

  const handleDelete = () => {
    if (!todoData.id) {
      toast.error("Missing ID for deletion");
      return;
    }
    execute({ id: todoData.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 text-foreground dark:text-white">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1 bg-white dark:bg-gray-900 dark:text-white border dark:border-gray-700">
        <DropdownMenuItem asChild>
          <EditDialogForm todo={todoData} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DropdownMenuItem asChild>
            <Button
              type="button"
              size={"sm"}
              onClick={handleDelete}
              className="w-full px-2 py-1 bg-red-400 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-700 text-white rounded cursor-pointer flex justify-center items-center gap-2"
            >
              <Trash className="w-5 h-5 text-white" /> Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
