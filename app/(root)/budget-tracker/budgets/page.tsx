import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getAllBudgetWithDetails } from "@/features/budget-tracker/actions/get-all-budget-with-details";
import { notFound } from "next/navigation";
import Budgets from "@/features/budget-tracker/components/budget/budgets";

const BudgetsPage = async () => {
  const data = await getAllBudgetWithDetails();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl "}>
      <h2 className={"font-bold text-2xl"}>Your Budget Plans</h2>
      <p className={"mb-4 text-gray-500 "}>
        Manage your existing budget plans or create new one.
      </p>
      <Budgets data={data} />
      <Button asChild={true} className={"mt-6"}>
        <Link href={"/budget-tracker/add-budget"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Budget Plan
        </Link>
      </Button>
    </div>
  );
};

export default BudgetsPage;
