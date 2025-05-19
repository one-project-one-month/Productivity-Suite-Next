import BudgetOverviewChart from "@/features/budget-tracker/components/budget-overview-chart";
import { getBudgetOverviewChartData } from "@/features/budget-tracker/actions/get-budget-overview-chart-data";
import { notFound } from "next/navigation";

const ChartSummaryPage = async () => {
  const data = await getBudgetOverviewChartData();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"md:col-span-2 p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      <BudgetOverviewChart data={data} />
    </div>
  );
};

export default ChartSummaryPage;
