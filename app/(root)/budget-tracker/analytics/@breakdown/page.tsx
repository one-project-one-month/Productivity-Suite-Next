import CategoryBreakdownChart from "@/features/budget-tracker/components/category-breakdown-chart";
import { getCategoryBreakdown } from "@/features/budget-tracker/actions/get-category-breakdown";
import { notFound } from "next/navigation";

const BudgetAnalyticsBreakdownPage = async () => {
  const data = await getCategoryBreakdown();

  if (!data) {
    return notFound();
  }

  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Category Breakdown</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Spending by category for the current month
      </p>
      <CategoryBreakdownChart data={data} />
    </div>
  );
};

export default BudgetAnalyticsBreakdownPage;
