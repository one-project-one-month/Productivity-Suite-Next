"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { TodoForm } from "./todo-form";
import { useState } from "react";

const CreateDialogForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-400">
          <CirclePlus className="w-5 h-5 mr-2" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 lg:mx-0">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <TodoForm isEdit={false} setOpen={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialogForm;
