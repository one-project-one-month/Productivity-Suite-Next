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
type todoActionProp = {
  todo: TodoSchema;
};
export const ActionDropdown = (todo: todoActionProp) => {
  const todoData = todo.todo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 border rounded">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditDialogForm todo={todoData} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="w-full px-2 py-1 bg-red-400 hover:bg-red-700 text-white rounded cursor-pointer flex justify-center items-center gap-2"
            onClick={() => alert(`Delete ${todoData.title}`)}
          >
            <Trash className="w-5 h-5 text-white" /> Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
