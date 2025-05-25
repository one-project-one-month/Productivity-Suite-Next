import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getAllExpenses } from "@/features/budget-tracker/actions/get-all-expenses";
import { notFound } from "next/navigation";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import Expenses from "@/features/budget-tracker/components/expense/expenses";

const ExpensesPage = async () => {
  const data = await getAllExpenses();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl "}>
      <h2 className={"font-bold text-2xl"}>All Expenses</h2>
      <p className={"mb-4 text-gray-500 "}>
        View and manage all your recorded expenses.
      </p>
      <Expenses data={data as IExpenseDetail[]} />
      <Button asChild={true} className={"mt-6"} variant={"outline"}>
        <Link href={"/budget-tracker/add-expense"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Link>
      </Button>
    </div>
  );
};

export default ExpensesPage;
