import { Button } from "@/components/ui/button";
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
import { Form } from "@/components/ui/form";
import { NewExpenseSchema, TNewExpenseSchema } from "@/database/validators";
import { useConfirm } from "@/hooks/use-confirm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ExpenseFormBody from "@/features/budget-tracker/components/form/expense-form-body";
import { useExpenseDetail } from "@/features/budget-tracker/context/expense-detail-context";
import { updateExpense } from "@/features/budget-tracker/actions/update-expense";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UpdateExpenseDialogProps = {
  id: string;
};

const UpdateExpenseDialog = ({ id }: UpdateExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are Your Sure!",
    "You are about to update this budget",
  );
  const defaultValues = useExpenseDetail(id);
  const form = useForm<TNewExpenseSchema>({
    resolver: zodResolver(NewExpenseSchema),
    defaultValues: { ...defaultValues },
  });

  const router = useRouter();

  const onSubmit = async (values: TNewExpenseSchema) => {
    const ok = await confirm();
    if (ok) {
      const { success, message } = await updateExpense({
        ...values,
        id: defaultValues.id,
      });
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <ConfirmDialog />
      <DialogTrigger asChild={true}>
        <Button variant="outline">
          <Edit />
          <span>Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>
            Update the detail of your budget plan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ExpenseFormBody control={form.control} />
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
                    <Save />
                    <span>Update</span>
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

export default UpdateExpenseDialog;
