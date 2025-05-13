import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { TodoForm } from "./todo-form";
import { TodoSchema } from "../types/todo-schema";
type todoProp = {
  todo: TodoSchema;
};
const EditDialogForm = (todo: todoProp) => {
  const todoData = todo.todo;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full px-2 py-1 bg-blue-400 hover:bg-blue-700 text-white rounded cursor-pointer flex justify-center items-center gap-2">
          <Pencil className="w-5 h-5 text-white" /> Edit
        </div>
      </DialogTrigger>
      <DialogContent className="mx-4 lg:mx-0">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TodoForm isEdit={true} todo={todoData} />
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogForm;
