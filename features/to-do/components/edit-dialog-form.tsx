"use client";

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
import { useState } from "react";
import { Button } from "@/components/ui/button";
type todoProp = {
  todo: TodoSchema;
};
const EditDialogForm = (todo: todoProp) => {
  const todoData = todo.todo;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="w-full px-2 py-1 bg-blue-400 hover:bg-blue-700 text-white rounded cursor-pointer flex justify-center items-center gap-2"
        >
          <Pencil className="w-5 h-5 text-white" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 lg:mx-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700">
            Edit Task
          </DialogTitle>
        </DialogHeader>
        <TodoForm
          isEdit={true}
          todo={todoData}
          setOpen={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogForm;
