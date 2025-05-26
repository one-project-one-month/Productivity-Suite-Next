import MonthlySpendingChart from "@/features/budget-tracker/components/chart/monthly-spending-chart";
import { getPastSpending } from "@/features/budget-tracker/actions/get-past-spending";
import { notFound } from "next/navigation";
import { getAllCategories } from "@/features/budget-tracker/actions/get-all-categories";
import { transformCategoryIntoChartLabel } from "@/lib/utils";

const BudgetAnalyticsPage = async () => {
  const pastSpendingPromise = getPastSpending();
  const categoriesPromise = getAllCategories();
  const [pastSpending, categories] = await Promise.all([
    pastSpendingPromise,
    categoriesPromise,
  ]);
  if (!pastSpending || !categories) {
    return notFound();
  }
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Monthly Spending</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your spending trends over the past 6 months
      </p>
      {pastSpending.length > 0 && categories.length > 0 ? (
        <MonthlySpendingChart
          data={pastSpending}
          categories={transformCategoryIntoChartLabel(categories)}
        />
      ) : (
        <div className={"py-26  text-gray-500 text-center"}>
          <p className={"font-semibold"}>No spending data available</p>
          <p>Add expenses to see your spending trends over time</p>
        </div>
      )}
    </div>
  );
};

export default BudgetAnalyticsPage;
