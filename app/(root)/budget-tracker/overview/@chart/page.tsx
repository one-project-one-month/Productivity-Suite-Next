import BudgetOverviewChart from "@/features/budget-tracker/components/chart/budget-overview-chart";
import { getBudgetOverviewChartData } from "@/features/budget-tracker/actions/get-budget-overview-chart-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartColumnStacked, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ChartSummaryPage = async () => {
  const data = await getBudgetOverviewChartData();
  if (!data) {
    return notFound();
  }
  return (
    <div
      className={cn(
        "md:col-span-2 p-6  border rounded-xl shadow-md",
        !data.length && "border-[1.5px] shadow-xs border-dashed",
      )}
    >
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      {data.length ? (
        <>
          <BudgetOverviewChart data={data} />
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

export default ChartSummaryPage;
