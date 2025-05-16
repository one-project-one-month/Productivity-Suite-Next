"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { updateStatus } from "../actions/todo-action";
import { useRouter } from "next/navigation";

type StatusDropdownProp = {
  id?: string;
};
export const StatusDropdown = ({ id }: StatusDropdownProp) => {
  const router = useRouter();
  const { execute } = useAction(updateStatus, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        router.push("/to-do");
      }
    },
  });

  const handlePending = () => {
    if (!id) {
      toast.error("Missing ID for update status");
      return;
    }
    execute({ id, status: "PENDING" });
  };

  const handleComplete = () => {
    if (!id) {
      toast.error("Missing ID for update status");
      return;
    }
    execute({ id, status: "COMPLETE" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="underline text-blue-500">
        changeStatus
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer text-yellow-500 font-medium hover:!bg-yellow-500 hover:!text-white"
          onClick={handlePending}
        >
          PENDING
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-green-500 font-medium hover:!bg-green-500 hover:!text-white"
          onClick={handleComplete}
        >
          COMPLETE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
