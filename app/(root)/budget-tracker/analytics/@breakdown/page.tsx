import CategoryBreakdownChart from "@/features/budget-tracker/components/category-breakdown-chart";
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
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Category Breakdown</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Spending by category for the current month
      </p>
      <CategoryBreakdownChart
        data={data}
        categories={transformCategoryIntoChartLabel(categories)}
      />
    </div>
  );
};

export default BudgetAnalyticsBreakdownPage;
