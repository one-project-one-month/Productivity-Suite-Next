import CategoryBreakdownChart from "@/features/budget-tracker/components/chart/category-breakdown-chart";
import { getCategoryBreakdown } from "@/features/budget-tracker/actions/get-category-breakdown";
import { notFound } from "next/navigation";
import { getAllCategories } from "@/features/budget-tracker/actions/get-all-categories";
import { transformCategoryIntoChartLabel } from "@/lib/utils";

const BudgetAnalyticsBreakdownPage = async () => {
  const breakdownPromise = getCategoryBreakdown();
  const categoryPromise = getAllCategories();
  const [data, categories] = await Promise.all([
    breakdownPromise,
    categoryPromise,
  ]);
  if (!data || !categories) {
    return notFound();
  }
  return (
    <div
      className={
        "p-6  border rounded-xl shadow-md bg-card text-card-foreground"
      }
    >
      <h2 className={"font-bold text-2xl"}>Category Breakdown</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Spending by category for the current month
      </p>
      {data.length > 0 && categories.length > 0 ? (
        <CategoryBreakdownChart
          data={data}
          categories={transformCategoryIntoChartLabel(categories)}
        />
      ) : (
        <div className={"py-26  text-gray-500 text-center"}>
          <p className={"font-semibold"}>No category data available</p>
          <p>Record expenses to see category breakdown</p>
        </div>
      )}
    </div>
  );
};

export default BudgetAnalyticsBreakdownPage;
