"use client";
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
import { Edit, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Budget, Category } from "@/database/interfaces.types";
import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NewBudgetSchema, TNewBudgetSchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import BudgetFormBody from "@/features/budget-tracker/components/form/budget-form-body";
import { Form } from "@/components/ui/form";
import { updateBudget } from "../../actions/update-budget";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

type UpdateBudgetDialogProps = {
  categories: Promise<Category[] | null | undefined>;
  budgetDetail: Promise<Budget | null | undefined>;
};

const UpdateBudgetDialog = ({
  categories,
  budgetDetail,
}: UpdateBudgetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [ConfrimDialog, confirm] = useConfirm(
    "Are Your Sure!",
    "You are about to update this budget",
  );
  const categoryData = use(categories);
  const budgetData = use(budgetDetail);
  const form = useForm<TNewBudgetSchema>({
    resolver: zodResolver(NewBudgetSchema),
    defaultValues: {
      ...budgetData,
    },
  });

  const router = useRouter();

  if (!categoryData || !budgetData) {
    return notFound();
  }

  const onSubmit = async (values: TNewBudgetSchema) => {
    const ok = await confirm();
    if (ok) {
      const { success, message } = await updateBudget({
        ...budgetData,
        ...values,
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
      <ConfrimDialog />
      <DialogTrigger asChild={true}>
        <Button variant="outline">
          <Edit />
          <span className={"sr-only"}>Update Budget Details </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
          <DialogDescription>
            Update the detail of your budget plan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <BudgetFormBody control={form.control} categories={categoryData} />
            <DialogFooter className={"mt-4"}>
              <DialogClose asChild={true}>
                <Button variant={"outline"}>Cancel</Button>
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

export default UpdateBudgetDialog;
