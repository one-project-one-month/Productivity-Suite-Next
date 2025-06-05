import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { deleteTodo } from "@/features/todos/actions/delete-todo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TodoDeleteBtn = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmModal, confirm] = useConfirm(
    "Are you sure!",
    "You are about to delete this task!",
  );
  const router = useRouter();
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsDeleting(true);
      const { success, message } = await deleteTodo(id);
      if (!success) {
        toast.error(message);
        setIsDeleting(false);
        return;
      }
      toast.success(message);
      router.refresh();
      setIsDeleting(false);
    }
  };
  return (
    <>
      <ConfirmModal />
      <Button variant={"destructive"} disabled={isDeleting} onClick={onDelete}>
        {isDeleting ? (
          <>
            <Loader2 className={"animate-spin"} />
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

export default TodoDeleteBtn;
