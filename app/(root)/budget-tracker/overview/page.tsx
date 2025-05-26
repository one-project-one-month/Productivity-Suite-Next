import SummaryCard from "@/features/budget-tracker/components/util/summary-card";
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
        description={
          data.totalBudget ? "Across all category" : "No budget Created Yet."
        }
      />
      <SummaryCard
        title={"Total Spent"}
        data={`${numFormatter.format(data.amountSpent)} MMK`}
        description={
          percentSpent
            ? `${percentSpent}% of all Total Budget`
            : "No Expenses Recorded"
        }
      />
      <SummaryCard
        title={"Remaining"}
        data={`${numFormatter.format(data.totalBudget - data.amountSpent)} MMK`}
        description={
          percentSpent
            ? `${100 - percentSpent}% of all Total Budget`
            : "Create a budget to start."
        }
      />
      <SummaryCard
        title={"Active Budget"}
        data={data.activeBudget.toString()}
        description={
          data.activeBudget
            ? `Across ${data.activeCategory} categories`
            : "No Active Budget"
        }
      />
    </>
  );
};

export default BudgetTrackerOverviewPage;
