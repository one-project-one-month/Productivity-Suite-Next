import { Button } from "@/components/ui/button";
import { RECENT_EXPENSES_PLACEHOLDER } from "@/constants";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Expense from "@/features/budget-tracker/components/expense";

const ExpensesPage = () => {
  return (
    <div className={"mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl "}>
      <h2 className={"font-bold text-2xl"}>Your Budget Plans</h2>
      <p className={"mb-4 text-gray-500 "}>
        Manage your existing budget plans or create new one.
      </p>
      <div>
        {RECENT_EXPENSES_PLACEHOLDER.map((expense, idx) => (
          <Expense {...expense} key={idx} />
        ))}
      </div>
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
