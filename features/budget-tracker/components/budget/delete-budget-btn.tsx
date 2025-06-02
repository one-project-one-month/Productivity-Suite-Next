"use client";
import { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { deleteBudget } from "@/features/budget-tracker/actions/delete-budget";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const DeleteBudgetBtn = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure!",
    "You are about to delete this budget plan.",
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsDeleting(true);
      const { success, message } = await deleteBudget(id);
      if (!success) {
        toast.error(message);
        return;
      } else {
        toast.success(message);
        await queryClient.invalidateQueries({
          queryKey: ["budgets"],
        });
        router.replace("/budget-tracker/budgets");
        router.refresh();
      }
      setIsDeleting(false);
    }
  };
  return (
    <>
      <ConfirmDialog />
      <Button
        variant={"destructive"}
        type={"button"}
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <Loader2 className={"mr-2 inline-block animate-spin"} />
            <span>Deleting</span>
          </>
        ) : (
          <>
            <Trash />
            <span>Delete</span>
          </>
        )}
      </Button>
    </>
  );
};

export default DeleteBudgetBtn;
