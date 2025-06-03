"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import DatePicker from "../../../../components/util/date-picker";
import ExpenseAmount from "../expense/expense-amount";
import BudgetPicker from "../budget/budget-picker";
import { Control } from "react-hook-form";
import { TNewExpenseSchema } from "@/database/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ExpenseFormBodyProps = {
  control: Control<TNewExpenseSchema>;
};
const ExpenseFormBody = ({ control }: ExpenseFormBodyProps) => {
  return (
    <div className={"flex flex-col gap-y-4 md:gap-y-6"}>
      <FormField
        control={control}
        name={"title"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expense Title</FormLabel>
            <FormControl>
              <Input placeholder={"Eg: ExpenseCard Title"} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"description"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expense Description</FormLabel>
            <FormControl>
              {/*//@ts-expect-error description can't be null since i give it a default empty string*/}
              <Textarea
                placeholder={"Eg: ExpenseCard Description"}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"budgetId"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expense Description</FormLabel>
            <FormControl>
              <BudgetPicker {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"amount"}
        render={({ field }) => (
          <FormItem className={"w-full"}>
            <FormLabel>Budget Amount</FormLabel>
            <FormControl>
              <ExpenseAmount {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"createdAt"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <DatePicker {...field} value={field.value!} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExpenseFormBody;
