import { getTransactionsByBudgetId } from "@/features/budget-tracker/actions/get-transactions-by-budget-id";
import { notFound } from "next/navigation";
import { BanknoteArrowDown, Plus } from "lucide-react";
import Expenses from "@/features/budget-tracker/components/expense/expenses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";

const BudgetRelatedExpensePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getTransactionsByBudgetId(id);
  if (!data) return notFound();
  return (
    <div
      className={cn(
        "mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl bg-card text-card-foreground",
        !data.length &&
          "border-black/20 border-dashed border-[1.5px] lg:border-2 dark:border-white/30",
      )}
    >
      <h2 className={"font-bold text-2xl"}>Expense History</h2>
      <p className={"mb-4 text-gray-500 "}>
        All expense recorded for this budget.
      </p>

      {data.length ? (
        <Expenses data={data as IExpenseDetail[]} />
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

export default BudgetRelatedExpensePage;
