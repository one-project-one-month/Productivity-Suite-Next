"use client";
import { useForm } from "react-hook-form";
import { CreateTodoSchema, TCreateTodoSchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import TodoFormBody from "@/features/todos/components/todo-form-body";
import { createTodo } from "@/features/todos/actions/create-todo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewTodoDialog = () => {
  const form = useForm<TCreateTodoSchema>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      dueAt: null,
    },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSubmit = async (value: TCreateTodoSchema) => {
    const { success, message } = await createTodo(value);
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    router.refresh();
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild={true}>
        <Button className={"w-fit"}>
          <Plus />
          <span>New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Add New Task And Track Your Activities
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TodoFormBody control={form.control} />
            <DialogFooter className={"mt-4"}>
              <DialogClose asChild={true}>
                <Button variant={"outline"} className={"mr-auto"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type={"submit"}
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className={"mr-2 inline-block animate-spin"} />
                    <span>Creating</span>
                  </>
                ) : (
                  <>
                    <span>Create</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTodoDialog;
