import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartColumnStacked, Plus, PlusCircle } from "lucide-react";
import { getAllBudgetWithDetails } from "@/features/budget-tracker/actions/get-all-budget-with-details";
import { notFound } from "next/navigation";
import Budgets from "@/features/budget-tracker/components/budget/budgets";
import { cn } from "@/lib/utils";

const BudgetsPage = async () => {
  const data = await getAllBudgetWithDetails();
  if (!data) {
    return notFound();
  }
  return (
    <div
      className={cn(
        "mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl bg-card text-card-foreground",
        !data.length &&
          "border-black/20 border-dashed border-[1.5px] lg:border-2",
      )}
    >
      <h2 className={"font-bold text-2xl"}>Your Budget Plans</h2>
      <p className={"mb-4 text-gray-500 "}>
        Manage your existing budget plans or create new one.
      </p>
      {data.length ? (
        <>
          <Budgets data={data} />
          <Button asChild={true} className={"mt-6"}>
            <Link href={"/budget-tracker/add-budget"}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Budget Plan
            </Link>
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
            <ChartColumnStacked className={"text-white"} />
          </div>
          <h2 className={"font-bold text-2xl"}>No Budget Plan Yet</h2>
          <p
            className={
              "my-4 mx-auto text-gray-400 font-semibold md:max-w-[80%] lg:my-6"
            }
          >
            Create your first budget plan to start tracking your expenses and
            see your spending overview.
          </p>
          <Button asChild={true}>
            <Link href={"/budget-tracker/add-budget"}>
              <Plus />
              <span className={"ml-2"}>Create New Budget</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;
