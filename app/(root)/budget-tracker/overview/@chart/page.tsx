import BudgetOverviewChart from "@/features/budget-tracker/components/budget-overview-chart";

const ChartSummaryPage = () => {
  return (
    <div className={"md:col-span-2 p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      <BudgetOverviewChart />
    </div>
  );
};

export default ChartSummaryPage;
