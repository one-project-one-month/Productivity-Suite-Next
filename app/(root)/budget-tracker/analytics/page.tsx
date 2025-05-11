import MonthlySpendingChart from "@/features/budget-tracker/components/monthly-spending-chart";

const BudgetAnalyticsPage = () => {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Monthly Spending</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your spending trends over the past 6 months
      </p>
      <MonthlySpendingChart />
    </div>
  );
};

export default BudgetAnalyticsPage;
