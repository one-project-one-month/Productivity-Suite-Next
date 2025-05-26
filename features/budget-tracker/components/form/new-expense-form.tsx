"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewExpenseSchema, TNewExpenseSchema } from "@/database/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BudgetPicker from "@/features/budget-tracker/components/budget/budget-picker";
import ExpenseAmount from "@/features/budget-tracker/components/expense/expense-amount";
import DurationPicker from "@/features/budget-tracker/components/util/duration-picker";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createNewExpense } from "@/features/budget-tracker/actions/create-new-expense";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Budget {
  id: string;
  title: string;
}

const NewExpenseForm = ({ budgets }: { budgets: Budget[] }) => {
  const form = useForm<TNewExpenseSchema>({
    resolver: zodResolver(NewExpenseSchema),
    defaultValues: {
      title: "",
      amount: 0.0,
      description: "",
      createdAt: new Date(),
      budgetId: budgets[0].id,
    },
  });

  const router = useRouter();

  const onSubmit = async (values: TNewExpenseSchema) => {
    const { success } = await createNewExpense(values);
    if (!success) {
      toast.error("Error creating new expense");
      return;
    } else {
      toast.success("Successfully created new expense");
      router.push("/budget-tracker/expenses");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5"}
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name={"budgetId"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Description</FormLabel>
              <FormControl>
                <BudgetPicker budgets={budgets} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
          control={form.control}
          name={"createdAt"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DurationPicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={"flex items-center justify-between"}>
          <Button variant={"outline"} asChild={true}>
            <Link href={"/budget-tracker/overview"}>Cancel</Link>
          </Button>
          <Button
            type={"submit"}
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className={"mr-2 inline-block animate-spin"} />
                <span>Adding Expense</span>
              </>
            ) : (
              <span>Add Expense</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewExpenseForm;
