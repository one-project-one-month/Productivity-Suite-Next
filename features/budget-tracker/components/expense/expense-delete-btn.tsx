import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { deleteExpense } from "@/features/budget-tracker/actions/delete-expense";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ExpenseDeleteBtn = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure!",
    "You are about to delete this budget plan.",
  );
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onDelete = async () => {
    setIsSubmitting(true);
    const ok = await confirm();
    if (ok) {
      const { success, message } = await deleteExpense(id);
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      router.refresh();
      setIsSubmitting(false);
      return;
    }
  };
  return (
    <>
      <ConfirmDialog />
      <Button
        variant={"destructive"}
        disabled={isSubmitting}
        onClick={onDelete}
      >
        <Trash />
        {isSubmitting ? <span>Deleting</span> : <span>Delete</span>}
      </Button>
    </>
  );
};

export default ExpenseDeleteBtn;
