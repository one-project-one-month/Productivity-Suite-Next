import { BUDGET_PLAN_PLACEHOLDER } from "@/constants";
import BudgetPlan from "@/features/budget-tracker/components/budget-plan";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const BudgetsPage = () => {
  return (
    <div className={"mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl "}>
      <h2 className={"font-bold text-2xl"}>Your Budget Plans</h2>
      <p className={"mb-4 text-gray-500 "}>
        Manage your existing budget plans or create new one.
      </p>
      <div>
        {BUDGET_PLAN_PLACEHOLDER.map((budget, idx) => (
          <BudgetPlan data={budget} key={idx} />
        ))}
      </div>
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
