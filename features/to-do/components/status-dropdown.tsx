"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useAction } from "next-safe-action/hooks";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

type StatusDropdownProp = {
  id?: string;
  currentStatus?: string;
};
export const StatusDropdown = ({}: StatusDropdownProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="underline">
        changeStatus
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer text-yellow-500 font-medium">
          PENDING
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-green-500 font-medium">
          COMPLETED
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500 font-medium">
          OVERDUE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
