"use client";

import { useForm } from "react-hook-form";
import { TNewBudgetSchema, NewBudgetSchema } from "@/database/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Category } from "@/database/interfaces.types";
import { Textarea } from "@/components/ui/textarea";
import CategoryPicker from "@/features/budget-tracker/components/category-picker";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DurationPicker from "@/features/budget-tracker/components/duration-picker";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNewBudget } from "@/features/budget-tracker/actions/create-new-budget";
import { Loader2 } from "lucide-react";

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5"}
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={"Eg: Budget Title"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/*//@ts-expect-error description can't be null since i give it a default empty string*/}
                <Textarea placeholder={"Eg: Budget Description"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"amount"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder={"0.00"}
                  value={field.value}
                  type={"number"}
                  onChange={(evt) =>
                    field.onChange(Number.parseInt(evt.target.value))
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"categoryId"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <CategoryPicker
                  value={field.value}
                  onChange={field.onChange}
                  categories={categories}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          className={
            "flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:items-center md:justify-between"
          }
        >
          <FormField
            control={form.control}
            name={"durationFrom"}
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DurationPicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"durationTo"}
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DurationPicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

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
