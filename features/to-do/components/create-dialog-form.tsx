import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { TodoForm } from "./todo-form";

const CreateDialogForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-400">
          <CirclePlus className="w-5 h-5" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 lg:mx-0">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <TodoForm isEdit={false} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialogForm;
