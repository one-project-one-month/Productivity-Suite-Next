import ExpenseCard from "@/features/budget-tracker/components/expense/expense-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRecentExpenses } from "@/features/budget-tracker/actions/get-recent-expenses";
import { notFound } from "next/navigation";
import { BanknoteArrowDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const RecentTransactionPage = async () => {
  const data = await getRecentExpenses();
  if (!data) {
    return notFound();
  }
  return (
    <div
      className={cn(
        "md:col-span-2 p-6  border rounded-xl shadow-md bg-card text-card-foreground",
        !data.length && "border-[1.5px] shadow-xs border-dashed",
      )}
    >
      <h2 className={"font-bold text-2xl"}>Recent Expenses </h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your most recent expenses across all budgets
      </p>
      {data.length ? (
        <>
          <div className={"lg:max-h-[300px] overflow-y-scroll lg:px-4"}>
            {data.map((item, idx) => (
              <ExpenseCard
                {...item}
                budgetId={item.budgetId as string}
                key={idx}
              />
            ))}
          </div>
          <Button asChild={true} variant={"outline"} className={"mt-4"}>
            <Link href={"/budget-tracker/expenses"}>View All Expenses</Link>
          </Button>
        </>
      ) : (
        <div className={"mt-4 text-center md:mt-8"}>
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

export default RecentTransactionPage;
