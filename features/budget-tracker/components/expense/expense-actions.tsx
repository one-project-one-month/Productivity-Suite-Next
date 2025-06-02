"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import ExpenseDeleteBtn from "@/features/budget-tracker/components/expense/expense-delete-btn";
import UpdateExpenseDialog from "@/features/budget-tracker/components/expense/update-expense-dialog";

const ExpenseActions = ({ id }: { id: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={"link"}>
          <EllipsisVertical className={"md:size-6"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-fit"}>
        <div className={"flex flex-col gap-y-2"}>
          <UpdateExpenseDialog id={id} />
          <ExpenseDeleteBtn id={id} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExpenseActions;
