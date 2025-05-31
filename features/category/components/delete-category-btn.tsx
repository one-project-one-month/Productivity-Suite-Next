"use client";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteCategory } from "../actions/delete-category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";

const DeleteCategoryBtn = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure!",
    "You are about to delete this category",
  );
  const router = useRouter();
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsDeleting(true);
      const { success, message } = await deleteCategory(id);
      if (!success) {
        toast.error(message);
        return;
      } else {
        toast.success(message);
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

export default DeleteCategoryBtn;
