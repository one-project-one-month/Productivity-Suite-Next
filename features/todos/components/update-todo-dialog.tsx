import { useForm } from "react-hook-form";
import { CreateTodoSchema, TCreateTodoSchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { Edit, Loader2, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import TodoFormBody from "@/features/todos/components/todo-form-body";
import { useConfirm } from "@/hooks/use-confirm";
import { updateTodo } from "@/features/todos/actions/update-todo";
import { Todo } from "@/database/interfaces.types";

const UpdateTodoDialog = ({ defaultValues }: { defaultValues: Todo }) => {
  const form = useForm<TCreateTodoSchema>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: { ...defaultValues },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ConfirmModal, confirm] = useConfirm(
    "Are you sure?",
    "You are about to update the detail of Task!",
  );

  const onSubmit = async (value: TCreateTodoSchema) => {
    const ok = await confirm();
    if (ok) {
      const { success, message } = await updateTodo(defaultValues.id, value);
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      router.refresh();
      form.reset();
      setOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal />
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild={true}>
          <Button className={"w-full"}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className={"mr-2 inline-block animate-spin"} />
                <span>Updating</span>
              </>
            ) : (
              <>
                <Edit />
                <span>Update</span>
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task Info</DialogTitle>
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
                      <span>Updating</span>
                    </>
                  ) : (
                    <>
                      <Edit />
                      <span>Update</span>
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTodoDialog;
