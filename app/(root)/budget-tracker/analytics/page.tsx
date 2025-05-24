import MonthlySpendingChart from "@/features/budget-tracker/components/monthly-spending-chart";
import { getPastSpending } from "@/features/budget-tracker/actions/get-past-spending";
import { notFound } from "next/navigation";

const BudgetAnalyticsPage = async () => {
  const data = await getPastSpending();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Monthly Spending</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your spending trends over the past 6 months
      </p>
      <MonthlySpendingChart data={data} />
    </div>
  );
};

export default BudgetAnalyticsPage;
