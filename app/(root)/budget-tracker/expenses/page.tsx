import { Button } from "@/components/ui/button";
import { BanknoteArrowDown, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { getAllExpenses } from "@/features/budget-tracker/actions/get-all-expenses";
import { notFound } from "next/navigation";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import Expenses from "@/features/budget-tracker/components/expense/expenses";
import { cn } from "@/lib/utils";

const ExpensesPage = async () => {
  const data = await getAllExpenses();
  if (!data) {
    return notFound();
  }
  return (
    <div
      className={cn(
        "mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl bg-card text-card-foreground",
        !data.length &&
          "border-black/20 border-dashed border-[1.5px] lg:border-2 dark:border-white/30",
      )}
    >
      <h2 className={"font-bold text-2xl"}>All Expenses</h2>
      <p className={"mb-4 text-gray-500 "}>
        View and manage all your recorded expenses.
      </p>

      {data.length ? (
        <>
          <Expenses data={data as IExpenseDetail[]} />
          <Button asChild={true} className={"mt-6"} variant={"outline"}>
            <Link href={"/budget-tracker/add-expense"}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </>
      ) : (
        <div className={"mt-4  text-center md:mt-8"}>
          <div
            role={"presentation"}
            className={
              "aspect-square w-12 mb-2 mx-auto flex items-center justify-center bg-gray-400 rounded-full md:mb-5"
            }
          >
            <BanknoteArrowDown className={"text-white dark:text-black"} />
          </div>
          <h2 className={"font-bold text-2xl"}>No Expenses Recorded</h2>
          <p
            className={
              "my-4 mx-auto text-gray-400 font-semibold md:max-w-[80%] lg:my-6"
            }
          >
            Start by adding your first expense to begin tracking your spending.
          </p>
          <Button asChild={true}>
            <Link href={"/budget-tracker/add-expense"}>
              <Plus />
              <span className={"ml-2"}>Add New Expense</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
