import SummaryCard from "@/features/budget-tracker/components/summary-card";
import { getBudgetsOverview } from "@/features/budget-tracker/actions/get-budgets-overview";
import { notFound } from "next/navigation";
import { numFormatter } from "@/lib/utils";

const BudgetTrackerOverviewPage = async () => {
  const data = await getBudgetsOverview();
  if (!data) return notFound();
  const percentSpent = Math.round((data.amountSpent / data.totalBudget) * 100);

  return (
    <>
      <SummaryCard
        title={"Total Budget"}
        data={`${numFormatter.format(data.totalBudget)} MMK`}
        description={"Across all category"}
      />
      <SummaryCard
        title={"Total Spent"}
        data={`${numFormatter.format(data.amountSpent)} MMK`}
        description={`${percentSpent}% of all Total Budget`}
      />
      <SummaryCard
        title={"Remaining"}
        data={`${numFormatter.format(data.totalBudget - data.amountSpent)} MMK`}
        description={`${100 - percentSpent}% of all Total Budget`}
      />
      <SummaryCard
        title={"Active Budget"}
        data={data.activeBudget.toString()}
        description={`Across ${data.activeCategory} categories`}
      />
    </>
  );
};

export default BudgetTrackerOverviewPage;
