import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { setCompleteTodo } from "@/features/todos/actions/set-complete-todo";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CompleteBtn = ({ id }: { id: string }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const onUpdate = async () => {
    setIsUpdating(true);
    const { success, message } = await setCompleteTodo(id);
    if (!success) {
      toast.error(message);
      setIsUpdating(false);
      return;
    }
    toast.success(message);
    router.refresh();
    setIsUpdating(false);
  };
  return (
    <>
      <Button disabled={isUpdating} onClick={onUpdate}>
        {isUpdating ? (
          <>
            <Loader2 className={"animate-spin"} />
            <span>Updating</span>
          </>
        ) : (
          <>
            <Check />
            <span>Set as Complete</span>
          </>
        )}
      </Button>
    </>
  );
};

export default CompleteBtn;
