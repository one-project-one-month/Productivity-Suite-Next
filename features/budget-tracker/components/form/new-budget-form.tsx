"use client";

import { useForm } from "react-hook-form";
import { TNewBudgetSchema, NewBudgetSchema } from "@/database/validators";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Category } from "@/database/interfaces.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNewBudget } from "@/features/budget-tracker/actions/create-new-budget";
import { Loader2 } from "lucide-react";
import BudgetFormBody from "@/features/budget-tracker/components/form/budget-form-body";

const NewBudgetForm = ({ categories }: { categories: Category[] }) => {
  const form = useForm<TNewBudgetSchema>({
    resolver: zodResolver(NewBudgetSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 100,
      categoryId: "",
      durationFrom: new Date(),
      durationTo: addDays(new Date(), 15),
    },
  });

  const router = useRouter();

  const onSubmit = async (values: TNewBudgetSchema) => {
    const { success } = await createNewBudget(values);
    if (!success) {
      return toast.error("Error Creating New Budget");
    } else {
      toast.success("Budget Created Successfully!");
      return router.push("/budget-tracker/budgets");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BudgetFormBody control={form.control} categories={categories} />
        <div className={"mt-6 md:mt-8 flex items-center justify-between"}>
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
                <span>Creating New Budget</span>
              </>
            ) : (
              <span>Create new Budget</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewBudgetForm;
